// Server Actions
"use server";

import { CreateJobDto, Job, jobsApi } from "@/lib/api/endpoints/jobsApi";
import { redirect } from "next/navigation";

export async function createJob(data: CreateJobDto) {
    let newJobId: string;

    try {
        const response: Job = await jobsApi.createJob(data);
        newJobId = response.id; // เก็บ ID ไว้ใช้ด้านนอก
    } catch (_) {
        return { error: "failed to create this job post" };
    }

    // ย้าย redirect ออกมานอก try-catch
    redirect(`/jobs/${newJobId}`);
}

export async function updateJobById(
    jobId: string,
    data: Partial<CreateJobDto>,
) {
    try {
        await jobsApi.updateJob(jobId, data);
    } catch (_) {
        return { error: "failed to update this job post id" };
    }

    redirect(`/jobs/${jobId}`);
}

export async function deleteJobById(jobId: string) {
    try {
        await jobsApi.deleteJob(jobId);
    } catch (_) {
        // ถ้า Error จาก API จะ Return ตรงนี้ ทำให้โค้ดไปไม่ถึง redirect ด้านล่าง
        return { error: "failed to delete this job post id" };
    }

    // ย้าย redirect ออกมานอก try-catch
    redirect("/company/me");
}
