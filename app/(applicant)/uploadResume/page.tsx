import Navbar from "@/components/navbar/Navbar";
import Button from "@/components/ui/Button";
import IconDownload from "@/components/icon/IconDownload";  
export default function UploadResume() {
    return (
        <>
            <Navbar variant="auth"></Navbar>

            <div>
                <h1 className="text-accent text-heading-3">Would you like to personalize your search by uploading a resume?</h1>

                <div className=" flex items-center justify-center border border-accent">
                    <div className=" flex flex-col items-center justify-center">
                        <IconDownload className="w-15 h-15 text-accent"/>
                        <Button variant="primary"> Upload your resume </Button>
                    </div>
                </div>
            </div>
        </>
    );
}