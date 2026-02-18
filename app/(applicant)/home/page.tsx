import Navbar from "@/components/navbar/Navbar";
import Textbox from "@/components/Textbox";

export default function Page() {
    return (
        <div>
            <Navbar variant="dashboard" activedTab="jobs" />
            <div className="page p-12">
                <div className="search flex gap-2 justify-center">
                    <Textbox
                        className="rounded-tl-full rounded-bl-full"
                        placeholder="Job Title, Keyword, or company"
                    ></Textbox>
                    <Textbox
                        className="rounded-tr-full rounded-br-full"
                        placeholder="Location"
                    ></Textbox>
                </div>
                <div className="jobs"></div>
            </div>
        </div>
    );
}
