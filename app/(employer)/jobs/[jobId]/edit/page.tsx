import { enumsApi } from "@/lib/api/endpoints/enumsApi";
import { Job, jobsApi } from "@/lib/api/endpoints/jobsApi";
import JobCreateForm, { JobData } from "../../create/JobCreateForm";

async function fetchCategories() {
    const categories = await enumsApi.getCategories();

    return categories.map((category: { id: string; name: string }) => ({
        value: category.id,
        label: category.name,
    }));
}

async function fetchJobDetailsById(jobId: string) {
    const job: Job = await jobsApi.getJob(jobId);
    return job;
}

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    const [job, categories] = await Promise.all([
        fetchJobDetailsById(jobId),
        fetchCategories(),
    ]);

    const props: JobData = {
        iJobTitle: job.title,
        iJobDetails: job.description,
        iLocation: {
            city: job.location?.city || "",
            province: job.location?.province || "",
            country: job.location?.country || "",
        },
        iWorkplaceType: job.workplaceType || "HYBRID",
        iEmploymentType: job.employmentType?.name || "Full-time",
        iSalaryMin: job.salaryMin || 0.0,
        iSalaryMax: job.salaryMax || 0.0,
        iCurrency: job.currency || "THB",
        iIsActive: job.isActive,
        iCategory: job.category?.name || "",
        iExperienceLevel: job.experienceLevel?.name || "",
        iDegreeLevelCode: job.educationRequirements?.[0].degreeLevelCode || "",
        iFieldOfStudy: job.educationRequirements?.[0].fieldOfStudy || "",
        iIsEducationOptional: job.educationRequirements?.[0].isOptional || true,
        iSkillWeight: job.skillWeight,
        iEducationWeight: job.educationWeight,
        iExperienceWeight: job.experienceWeight,
        iSkills: job.skillRequirements.map(
            (skill: { skill: { name: string } }) => skill.skill.name,
        ),
    };

    return (
        <JobCreateForm
            jobData={props}
            categoryOptions={categories}
            mode="edit"
            jobId={job.id}
        />
    );
}
