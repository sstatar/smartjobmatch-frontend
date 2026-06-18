"use client";

import { deleteCompany } from "@/app/actions/company";
import { Company } from "@/lib/api/endpoints/companiesApi";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import CompanyJobList from "../employer/CompanyJobList";
import { JobCardData } from "./JobsList/JobsList.client";

export default function CompanyInfo({
    company,
    isOwner = false,
}: {
    company: Company;
    isOwner?: boolean;
}) {
    const jobsData: JobCardData[] = company.jobPosts.map((job) => ({
        ...job,
        companyId: company.id,
        categoryId: job.category.id,
        company,
        skillRequirements: [],
    }));

    const logoFallback = "/default-logo.png";
    // "https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg";

    const [imgSrc, setImgSrc] = useState(company.logoUrl || logoFallback);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    function handleEdit() {
        redirect("/company/me/edit");
    }
    async function handleDelete() {
        if (confirm("Do you want to delete this company?")) {
            await deleteCompany();
        }
    }

    return (
        <div className="mx-4 md:mx-16 lg:mx-40 border border-gray-300 rounded-lg py-6 px-4 md:py-8 md:px-12">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 pb-4 border-b border-gray-300">
                    {company?.logoUrl ? (
                        // TODO: BUG รูปไม่โหลดทุกครั้ง โหลดทุก 2 ครั้งที่รีเฟรชแทน
                        <Image
                            src={imgSrc || logoFallback}
                            alt={company.name}
                            width={80}
                            height={80}
                            onError={() => {
                                setImgSrc(logoFallback);
                            }}
                        />
                    ) : (
                        <div className="w-20 h-20 bg-gray-300 rounded-full" />
                    )}
                    <h1 className="flex text-heading-2 font-bold justify-between gap-4">
                        <>{company!.name}</>
                        {/* <IconEdit className="w-6 h-6" /> */}
                        {/* --- ส่วนประกอบเมนู Meatballs --- */}
                        {isOwner && (
                            <div className="relative">
                                <div
                                    className="relative z-10"
                                    ref={menuRef}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() =>
                                            setIsMenuOpen(!isMenuOpen)
                                        }
                                        className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label="Job options"
                                    >
                                        {/* ไอคอน 3 จุด */}
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    {/* กล่อง Dropdown */}
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden flex flex-col">
                                            <button
                                                onClick={handleEdit}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Edit Company
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Delete Company
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* --- จบส่วนประกอบเมนู Meatballs --- */}
                    </h1>
                    <div className="section-nav flex gap-4 text-heading-3 font-semibold">
                        <a href="#overview" className="underline">
                            Overview
                        </a>
                        <a href="#jobs" className="underline">
                            Jobs
                        </a>
                    </div>
                </div>
                <section id="overview" className="flex flex-col gap-2">
                    <h1 className="text-heading-3 font-semibold">Overview</h1>
                    <div className="markdown">
                        <ReactMarkdown>{company!.description}</ReactMarkdown>
                    </div>
                </section>
                <section id="jobs" className="flex flex-col gap-4">
                    <CompanyJobList jobsData={jobsData} />
                </section>
            </div>
        </div>
    );
}
