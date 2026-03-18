import Navbar from "@/components/navbar/Navbar";
import UploadResumeClient from "./UploadResumeClient";
export default function UploadResume() {
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-3">
                <UploadResumeClient />
            </div>
        </div>
    );
}
