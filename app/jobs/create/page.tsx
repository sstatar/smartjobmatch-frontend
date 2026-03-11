import { enumsApi } from "@/lib/api/endpoints/enumsApi";
import JobCreateForm, { JobData } from "./JobCreateForm";

async function fetchCategories() {
    const categories = await enumsApi.getCategories();

    return categories.map((category: { id: string; name: string }) => ({
        value: category.id,
        label: category.name,
    }));
}

const props: JobData = {
    iJobTitle: "",
    iJobDetails: "",
    iLocation: {
        city: "",
        province: "",
        country: "",
    },
    iSalaryMin: 0.0,
    iSalaryMax: 0.0,
    categoryOptions: await fetchCategories(),
    iExperienceLevel: "",
    iFieldOfStudy: "",
    iIsEducationOptional: true,
    iSkillWeight: 34.0,
    iEducationWeight: 33.0,
    iExperienceWeight: 33.0,
    iSkills: [],
};

export default function Page() {
    return <JobCreateForm jobData={props} />;
}
