import Navbar from "@/components/navbar/Navbar";
import Button from "@/components/ui/Button";
import IconDownload from "@/components/icon/IconDownload";
import ButtonSecond from "@/components/ui/Button-2";
import ContentCircle from "@/components/ui/ContentCircle";
import IconRightArrow from "@/components/icon/IconRightArrow";
export default function UploadResume() {
    return (
        <>
            <Navbar variant="auth"></Navbar>

            <div className="flex flex-col items-center gap-16">
                <h1 className="text-accent text-heading-2 font-[var(--weight-heading)]">
                    Would you like to personalize your search by uploading a
                    resume?
                </h1>

                <div className=" flex items-center justify-center border border-accent p-14 rounded-sm min-w-[386px]">
                    <div className=" flex flex-col items-center justify-center gap-10 ">
                        <ContentCircle>
                            <IconDownload className="w-15 h-15 text-accent" />
                        </ContentCircle>
                        <ButtonSecond variant="tertiary">
                            Upload your resume
                        </ButtonSecond>
                    </div>
                </div>
            </div>

            <div className="mx-20 mt-20 flex justify-end items-center gap-6">
                <h1 className="text-xl font-bold text-primary">Skip for now</h1>
                <ContentCircle padding="p-0">
                    <IconRightArrow className="w-15 h-15 text-accent" />
                </ContentCircle>
            </div>
        </>
    );
}
