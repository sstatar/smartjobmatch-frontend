import { getMyInfo } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import CompanyCreateForm from "./CompanyCreateForm";

export default async function Page() {
    const user = await getMyInfo();
    if (!user) {
        redirect("/login");
    }
    if (user.role !== "EMPLOYER") {
        redirect("/home");
    }
    if (user.companyId) {
        redirect("/company/me");
    }

    const data = {
        iName: "",
        iDescription: "",
        iWebsite: "",
        iLogoUrl: "",
        iIndustry: "",
    };

    return <CompanyCreateForm data={data} />;
}
