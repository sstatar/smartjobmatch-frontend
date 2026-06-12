import ResumeSectionDisplay from "./ResumeSectionDisplay";
import { fetchUserProfileServer } from "../(profile)/service/profileAction";

const formatUploadDate = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default async function page() {
    const profileData = await fetchUserProfileServer();

    const getInitialStep = () => {
        if (!profileData?.resumeUrl) return "start";
        if (profileData?.isResumeAnalyzed) return "done";
        return "upload";
    };

    const initialStep = getInitialStep();

    return (
        <div className="flex flex-col min-h-[80vh]">
            <div className="flex flex-1 flex-col mt-2.5 w-full overflow-hidden">
                <div>
                    <h1 className="text-heading-200 font-(--weight-heading) text-accent mx-4 md:mx-10 mb-2 md:mb-1.5">
                        Resume
                    </h1>

                    <div className="flex bg-accent-2 p-4 md:p-6 rounded-lg shadow-sm">
                        <ResumeSectionDisplay
                            initialStep={initialStep}
                            resumeData={{
                                fileName: profileData?.resumeFileName,
                                uploadDate: formatUploadDate(profileData?.resumeUploadDate),
                                isSearchable: profileData?.isSearchable,
                                resumeUrl: profileData?.resumeUrl,
                                isResumeAnalyzed: profileData?.isResumeAnalyzed,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}