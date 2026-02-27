import { Company } from "@/app/actions/company";
import Image from "next/image";
import CompanyJobList from "./CompanyJobList";
import { JobCardData } from "./JobsList/JobsList.client";

export default function CompanyInfo({ company }: { company: Company }) {
    const jobsData: JobCardData[] = company.jobPosts.map((job) => ({
        ...job,
        companyId: company.id,
        categoryId: job.category.id,
        company,
        skillRequirements: [],
    }));

    return (
        <div className="my-12 mx-40 border border-gray-300 rounded-lg py-8 px-12">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 pb-4 border-b border-gray-300">
                    {company!.logoUrl ? (
                        <Image src={company!.logoUrl} alt={company!.name} />
                    ) : (
                        <div className="w-20 h-20 bg-gray-300 rounded-full" />
                    )}
                    <h1 className="text-heading-2 font-bold">
                        {company!.name}
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
                    <p>{company!.description}</p>
                </section>
                <section id="jobs" className="flex flex-col gap-4">
                    <CompanyJobList jobsData={jobsData} />
                </section>
            </div>
        </div>
    );
}
