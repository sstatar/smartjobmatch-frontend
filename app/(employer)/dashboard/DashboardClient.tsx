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
        <div className="flex flex-col gap-10">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <StateCard
                        title="Total Jobs"
                        value={totalJobsCount}
                    ></StateCard>
                    <StateCard
                        title="Open Jobs"
                        value={openJobsCount}
                    ></StateCard>
                    <StateCard
                        title="total Applicants"
                        value={totalApplicantsCount}
                    ></StateCard>
                </div>

                <SearchBar
                    value={keyword}
                    onChange={setKeyword}
                    onSearch={handleSearch}
                />
            </div>

            <JobTable jobs={filteredJobs}></JobTable>
        </div>
    );
}
