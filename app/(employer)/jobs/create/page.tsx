import { enumsApi } from "@/lib/api/endpoints/enumsApi";
import JobCreateForm, { JobData } from "./JobCreateForm";
import { DegreeLevelCode } from "@/lib/api/endpoints/jobsApi";

async function fetchCategories() {
    const categories = await enumsApi.getCategories();

    return categories.map((category: { id: string; name: string }) => ({
        value: category.id,
        label: category.name,
    }));
}

const categories = await fetchCategories();

const props: JobData = {
    iJobTitle: "",
    iJobDetails: "",
    iLocation: {
        city: "",
        province: "",
        country: "",
    },
    iWorkplaceType: "ON_SITE",
    iEmploymentType: "Full-time",
    iSalaryMin: 0.0,
    iSalaryMax: 0.0,
    iCurrency: "THB",
    iIsActive: true,
    iCategory: categories[0].label,
    iExperienceLevel: "",
    iDegreeLevelCode: "BACHELOR",
    iFieldOfStudy: "",
    iIsEducationOptional: true,
    iSkillWeight: 34.0,
    iEducationWeight: 33.0,
    iExperienceWeight: 33.0,
    iSkills: [],
};

export default function Page() {
    return <JobCreateForm jobData={props} categoryOptions={categories} />;
}
