"use client";

import Textbox from "../ui/Textbox";
import SearchIcon from "@/public/svgs/search.svg";
import LocationIcon from "@/public/svgs/location.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function JobQueryInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback(
        (term: string, paramKey: string) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", "1");
            if (term) {
                params.set(paramKey, term);
            } else {
                params.delete(paramKey);
            }
            replace(`${pathname}?${params.toString()}`);
        },
        300,
    );

    return (
        <div className="search flex flex-col md:flex-row gap-2 md:gap-0 justify-center w-full max-w-4xl mx-auto shadow-sm md:shadow-none p-2 md:p-0 bg-white rounded-2xl md:bg-transparent">
            
            <Textbox
                className="w-full rounded-xl md:rounded-r-none md:rounded-l-full md:border-r-0"
                placeholder="Job Title, Keyword, or company"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value, "query")}
            >
                <SearchIcon className="text-accent w-5 h-5" />
            </Textbox>

            {/* ขีดเส้นคั่นบางๆ ระหว่าง 2 ช่อง เฉพาะบนจอคอม (สวยงามแบบมืออาชีพ) */}
            <div className="hidden md:block w-[1px] bg-gray-200 z-10" />

            <Textbox
                // 💡 4. โค้งทุกมุมบนมือถือ และ โค้งแค่ขวาบนจอคอม
                className="w-full rounded-xl md:rounded-l-none md:rounded-r-full md:border-l-0"
                placeholder="Location"
                defaultValue={searchParams.get("location")?.toString()}
                onChange={(e) => handleSearch(e.target.value, "location")}
            >
                <LocationIcon className="text-accent w-5 h-5" />
            </Textbox>
        </div>
    );
}