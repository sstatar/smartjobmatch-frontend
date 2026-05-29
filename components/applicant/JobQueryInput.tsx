"use client"; // ต้องใส่เพื่อระบุว่าเป็น Client Component

import Textbox from "../ui/Textbox";
import SearchIcon from "@/public/svgs/search.svg";
import LocationIcon from "@/public/svgs/location.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function JobQueryInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // ฟังก์ชันสำหรับอัปเดต URL Params แบบหน่วงเวลา 300ms
    const handleSearch = useDebouncedCallback(
        (term: string, paramKey: string) => {
            const params = new URLSearchParams(searchParams);

            // รีเซ็ตหน้ากลับไปที่ 1 เสมอเมื่อมีการพิมพ์ค้นหาใหม่
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
        <div className="search flex gap-2 justify-center">
            <Textbox
                className="rounded-tl-full rounded-bl-full"
                placeholder="Job Title, Keyword, or company"
                // ดึงค่าเริ่มต้นจาก URL มาแสดง
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value, "query")}
            >
                <SearchIcon className="text-accent w-5 h-5" />
            </Textbox>

            <Textbox
                className="rounded-tr-full rounded-br-full"
                placeholder="Location"
                defaultValue={searchParams.get("location")?.toString()}
                onChange={(e) => handleSearch(e.target.value, "location")}
            >
                <LocationIcon className="text-accent w-5 h-5" />
            </Textbox>
        </div>
    );
}
