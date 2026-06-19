"use client";

import { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import StateCard from "@/components/applicant/StateCard";
import JobTable from "@/components/employer/JobTable";
import { JobPost } from "@/lib/api/endpoints/companiesApi";

interface DashboardClientProps {
    initialJobs: JobPost[];
}

export default function DashboardClient({ initialJobs }: DashboardClientProps) {
    // สร้าง State สำหรับระบบ Search
    const [keyword, setKeyword] = useState("");
    // สร้าง State สำหรับเก็บข้อมูลตาราง (เผื่อมีการกรอง)
    const [jobs, setJobs] = useState<JobPost[]>(initialJobs);

    const filteredJobs = initialJobs.filter((job) => {
        // ถ้าช่องค้นหาว่างเปล่า ให้งานทั้งหมดผ่านตะแกรงไปได้เลย
        if (keyword.trim() === "") return true;

        // ถ้ามีการพิมพ์ ให้เช็คว่าชื่อตรงไหม
        return job.title.toLowerCase().includes(keyword.toLowerCase());
    });

    const handleSearch = () => {
        // 1. ถ้าไม่มีคำค้นหา ให้เอาข้อมูลเดิมมาใช้
        if (keyword.trim() === "") {
            setJobs(initialJobs);
            return;
        }

        // 2. ถ้ามีคำค้นหา ให้ไปกรองข้อมูลออกมาจาก initialJobs
        const filteredJobs = initialJobs.filter((job) => {
            const matchTitle = job.title
                .toLowerCase()
                .includes(keyword.toLowerCase());

            return matchTitle;
        });
        setJobs(filteredJobs);
    };

    const totalJobsCount = filteredJobs.length;

    // 2. งานที่กำลังเปิดรับ
    const openJobsCount = filteredJobs.filter(
        (job) => job.isActive === true,
    ).length;

    // 3. รวมจำนวนผู้สมัครจากทุกงาน
    const totalApplicantsCount = filteredJobs.reduce((sum, job) => {
        // เอาของเดิม (sum) + จำนวนคนสมัครในงานนั้นๆ (ถ้าไม่มีให้บวก 0)
        return sum + (job.applications?.length || 0);
    }, 0); // เลข 0 ตัวหลังสุดคือค่าเริ่มต้น (เริ่มนับจากศูนย์)

    return (
        <div className="flex flex-col gap-6 lg:gap-10">
            {/* กล่องคลุม Header */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 lg:gap-6">
                {/* 1. SearchBar (มือถืออยู่บนสุด order-1 / คอมไปอยู่ขวา lg:order-2) */}
                <div className="w-full lg:w-auto order-1 lg:order-2">
                    <SearchBar
                        value={keyword}
                        onChange={setKeyword}
                        onSearch={handleSearch}
                    />
                </div>

                {/* 2. StateCards (มือถืออยู่ล่าง order-2 / คอมกลับมาอยู่ซ้าย lg:order-1) */}
                {/* บังคับเรียงแนวนอน 3 คอลัมน์ตลอดเวลาด้วย grid-cols-3 */}
                <div className="w-full lg:w-auto grid grid-cols-3 gap-2 order-2 lg:order-1">
                    <StateCard title="Total Jobs" value={totalJobsCount} />
                    <StateCard title="Open Jobs" value={openJobsCount} />
                    <StateCard
                        title="Applicants" /* 💡 แนะนำให้ตัดคำว่า total ออก เพื่อไม่ให้ตัวหนังสือล้นกรอบบนมือถือ */
                        value={totalApplicantsCount}
                    />
                </div>
            </div>

            <JobTable jobs={filteredJobs}></JobTable>
        </div>
    );
}
