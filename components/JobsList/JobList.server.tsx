import { API_BASE_URL } from "@/lib/api-config";
import { cookies } from "next/headers";
import JobAppliedClient from "./JobAppliedList.client";
import JobListClient from "./JobsList.client";

export type QueryType = "all" | "bookmarked" | "applied";

export default async function JobsList({
    queryType = "all",
}: {
    queryType?: QueryType;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const queryUrls = {
        all: `${API_BASE_URL}/job-posts`,
        bookmarked: `${API_BASE_URL}/job-posts/bookmarked`,
        applied: `${API_BASE_URL}/applications/mine`,
    };

    const jobs = await fetch(queryUrls[queryType], {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());

    const JobClient = {
        all: <JobListClient jobs={jobs} />,
        bookmarked: <JobListClient jobs={jobs} />,
        applied: <JobAppliedClient jobs={jobs} />,
    };
    return <>{JobClient[queryType]}</>;
}
