"use client";
import { useState } from "react";
import MeatballsMenu from "@/public/svgs/meatballsMenu.svg";

type DataProps = {
    resumeName: string;
    dateAdded: string;
};
export default function ResumeFileCard({
    resumeName,
    dateAdded,
}: DataProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="py-5 px-6 rounded-lg border-2 border-accent w-full max-w-100 ">
            <div className="flex items-center justify-between ">
                <div className="flex flex-col gap-1">
                    <h1 className="text-heading-3 text-accent font-bold">
                        {resumeName}
                    </h1>
                    <span>Date added : {dateAdded} </span>
                </div>
                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} 
                        className="hover:bg-gray-100 rounded-full p-3 active:scale-95 transition-colors">
                        <MeatballsMenu></MeatballsMenu>
                    </button>

                    {isOpen && (
                        <div className="absolute right-(-10) mt-2 w-40 flex flex-col border-2 border-accent bg-white rounded-md shadow-lg z-50 overflow-hidden">
                            <button className="px-4 py-2 text-left hover:bg-accent/10 transition-colors border-b border-accent/20">
                                Preview
                            </button>
                            <button className="px-4 py-2 text-left hover:bg-accent/10 transition-colors border-b border-accent/20">
                                Replace file
                            </button>
                            <button className="px-4 py-2 text-left hover:bg-red-50 text-red-600 transition-colors">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
