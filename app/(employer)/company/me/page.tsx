import { getMyInfo } from "@/app/actions/auth";
import CompanyInfo from "@/components/CompanyInfo";
import { ApiError } from "@/lib/api/apiError";
import { companiesApi, Company } from "@/lib/api/endpoints/companiesApi";

export default async function Page() {
    let company: Company | null = null;
    try {
        company = await companiesApi.getMyCompany();
    } catch (error) {
        if (error instanceof ApiError) {
            console.log(error.data);
        } else {
            console.log(error);
        }
    }

    // TODO: check user is owner and send to companyinfo
    const user = await getMyInfo();
    const isOwner = user?.companyId === company?.id;

    return company ? (
        <CompanyInfo company={company} isOwner={isOwner} />
    ) : (
        <div className="text-center">Failed to fetch company</div>
    );
}
