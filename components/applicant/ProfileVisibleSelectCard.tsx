"use client";
import IconVisibility from "@/components/icon/IconVisibility";
import IconCross from "@/public/svgs/cross.svg";
import ButtonSecond from "@/components/ui/Button-2";
import { useState } from "react";

type ProfileVisibilitySelectCardProps = {
    onclose: () => void;
    setVisibility: (value: string) => void;
    visibility: string;
    onSave: (newValue: string) => void;
};

export default function ProfileVisibilitySelectCard({
    onclose,
    visibility,
    onSave,
}: ProfileVisibilitySelectCardProps) {
    const [localVisibility, setLocalVisibility] = useState(visibility);
    return (
        <div className=" bg-secondary items-center p-3 rounded-2xl ">
            <div className="flex items-center justify-end">
                <button
                    className="p-2 cursor-pointer hover:bg-accent-2 rounded-full transition-colors duration-200 group"
                    onClick={onclose}
                >
                    <IconCross className="w-4 h-4 text-accent" />
                </button>
            </div>

            <div className="flex flex-col m-3 items-center gap-4 ">
                <h1 className="text-accent text-heading-3 font-bold">
                    Visibility to hiring employers
                </h1>
                <label className="flex items-center justify-between w-full gap-10 cursor-pointer p-4 px-6 rounded-xl hover:bg-accent-2 transition-colors duration-200">
                    <input
                        type="radio"
                        name="visibility"
                        value={"public"}
                        checked={localVisibility === "public"}
                        onChange={(e) => setLocalVisibility(e.target.value)}
                        className="w-6 h-6 accent-accent cursor-pointer"
                    />
                    <div className="flex flex-col gap-2 ">
                        <span className="text-accent text-heading-5 font-semibold">
                            Hiring employers can find you
                        </span>
                        <span className="text-accent text-button-3 max-w-100">
                            Allow employers to find me through SmartJobsMatch using my
                            resume and profile. I agree to SmartJobsMatch&apos;s Terms
                            and acknowledge their Cookie & Privacy Policies
                        </span>
                    </div>

                    <IconVisibility className="w-6 h-6 text-accent"></IconVisibility>
                </label>
                <label className="flex items-center justify-between w-full gap-10 cursor-pointer p-4 px-6 rounded-xl hover:bg-accent-2 transition-colors duration-200">
                    <input
                        type="radio"
                        name="visibility"
                        value={"private"}
                        checked={localVisibility === "private"}
                        onChange={(e) => setLocalVisibility(e.target.value)}
                        className="w-6 h-6 accent-accent cursor-pointer"
                    />
                    <div className="flex flex-col gap-2">
                        
                        <span className="text-accent text-heading-5 font-semibold">
                            Hiring employers can&apos;t find you
                        </span>
                        <span className="text-accent text-button-3 max-w-100">
                            Employers can’t find your profile on Indeed or reach
                            out unless you apply to one of their jobs.
                        </span>
                    </div>
                    <IconVisibility
                        isHidden={true}
                        className="w-6 h-6 text-accent"
                    ></IconVisibility>
                </label>
                <ButtonSecond variant="tertiary" onClick={() => onSave(localVisibility)}>
                    Save
                </ButtonSecond>
            </div>
        </div>
    );
}
