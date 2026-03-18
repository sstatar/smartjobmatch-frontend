import { getMyInfo } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import CompanyCreateForm from "../../create/CompanyCreateForm";
import { companiesApi, Company } from "@/lib/api/endpoints/companiesApi";

export default async function Page() {
    const user = await getMyInfo();
    if (!user) {
        redirect("/login");
    }
    if (user.role !== "EMPLOYER") {
        redirect("/home");
    }

    let myCompany: Company | null = null;
    try {
        myCompany = await companiesApi.getMyCompany();
    } catch (error) {
        console.error(error);
    }

    if (!myCompany) {
        redirect("/company/create");
    }

    const data = {
        iName: myCompany.name,
        iDescription: myCompany.description || "",
        iWebsite: myCompany.website || "",
        iLogoUrl: myCompany.logoUrl || "",
        iIndustry: myCompany.industry || "",
    };

    return <CompanyCreateForm data={data} mode="edit" />;
}
