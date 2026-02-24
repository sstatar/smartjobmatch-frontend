import { getMyCompany } from "@/app/actions/company";
import CompanyInfo from "@/components/CompanyInfo";

export default async function Page() {
    const myCompany = await getMyCompany();
    const company = myCompany.data;

    return company ? (
        <CompanyInfo company={company} />
    ) : (
        <div>{myCompany.error}</div>
    );
}
