import Navbar from "@/components/layout/navbar/Navbar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import ResumeSectionDisplay from "./ResumeSectionDisplay";
import { fetchUserProfileServer } from "../(profile)/service/profileAction";

export default async function page() {
    const profileData = await fetchUserProfileServer();

    const getInitialStep = () => {
        if (!profileData?.resumeUrl) return "start";
        if (profileData?.isResumeAnalyzed) return "done";
        return "upload";
    };

    const initialStep = getInitialStep();
    
    return (
        <div className="h-screen flex flex-col mt-8">
            <div className="flex flex-1 overflow-hidden gap-4 justify-center px-8">
                <Sidebar />

                <div className="flex flex-1 flex-col mt-2.5 width-full overflow-hidden">
                    <div>
                        <h1 className=" text-heading-200 font-(--weight-heading) text-accent mx-10 mb-1.5">
                            Resume
                        </h1>

                        <div className="flex bg-accent-2 p-6 rounded-lg">
                            <ResumeSectionDisplay
                                initialStep={initialStep}
                                resumeData={{
                                    fileName: profileData?.resumeFileName,
                                    uploadDate: profileData?.resumeUploadDate,
                                    isSearchable: profileData?.isSearchable,
                                    resumeUrl: profileData?.resumeUrl,
                                    isResumeAnalyzed: profileData?.isResumeAnalyzed,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
