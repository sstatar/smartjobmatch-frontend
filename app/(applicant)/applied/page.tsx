import JobsList from "@/components/JobsList/JobList.server";
import Navbar from "@/components/navbar/Navbar";
import Textbox from "@/components/ui/Textbox";
import LocationIcon from "@/public/svgs/location.svg";
import SearchIcon from "@/public/svgs/search.svg";

export default function Page() {
    return (
        <div>
            <Navbar variant="dashboard" activedTab="applied" />

            <div className="page flex flex-col gap-8 m-12">
                <div className="search flex gap-2 justify-center">
                    <Textbox
                        className="rounded-tl-full rounded-bl-full"
                        placeholder="Job Title, Keyword, or company"
                    >
                        <SearchIcon className="text-accent w-5 h-5" />
                    </Textbox>
                    <Textbox
                        className="rounded-tr-full rounded-br-full"
                        placeholder="Location"
                    >
                        <LocationIcon className="text-accent w-5 h-5" />
                    </Textbox>
                </div>

                <div>
                    <JobsList queryType="applied" />
                </div>
            </div>
        </div>
    );
}
