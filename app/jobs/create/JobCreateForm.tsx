"use client";

import { createJob, updateJobById } from "@/app/actions/job";
import HoverableTips from "@/components/HoverableTips";
import LabeledCheckbox from "@/components/inputUi/LabeledCheckbox";
import LabeledDropdown from "@/components/inputUi/LabeledDropdown";
import LabeledOptions from "@/components/inputUi/LabeledOptions";
import LabeledTextArea from "@/components/inputUi/LabeledTextArea";
import LabeledTextbox from "@/components/inputUi/LabeledTextbox";
import TextboxList from "@/components/inputUi/TextboxList";
import Button from "@/components/ui/Button-2";
import { CreateJobDto } from "@/lib/api/endpoints/jobsApi";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import axios from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useState } from "react";

const workplaceOptions: Option[] = [
    { value: "ON_SITE", label: "On-Site" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "REMOTE", label: "Remote" },
];
const worktypeOptions: Option[] = [
    { value: "Full-time", label: "Full Time" },
    { value: "Part-time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
];
const currencyOptions: Option[] = [
    { value: "THB", label: "THB" },
    { value: "USD", label: "USD" },
];
const degreeLevelOptions: Option[] = [
    { value: "BACHELOR", label: "Bachelor's Degree" },
    { value: "MASTER", label: "Master's Degree" },
    { value: "DOCTORATE", label: "Doctoral Degree" },
    { value: "PRIMARY", label: "Primary Education Level" },
    { value: "SECONDARY", label: "Secondary Education Level" },
];

export interface Option {
    value: string;
    label: string;
}

type Mode = "create" | "edit";

export interface JobData {
    iJobTitle: string;
    iJobDetails: string;
    iLocation: {
        city: string;
        province: string;
        country: string;
    };
    iSalaryMin: number;
    iSalaryMax: number;
    categoryOptions: Option[];
    iExperienceLevel: string;
    iFieldOfStudy: string;
    iIsEducationOptional: boolean;
    iSkillWeight: number;
    iEducationWeight: number;
    iExperienceWeight: number;
    iSkills: string[];
}

export interface JobCreateFormProps {
    jobData: JobData;
    mode?: Mode;
    jobId?: string;
}

export default function JobCreateForm({
    jobData,
    mode = "create",
    jobId,
}: JobCreateFormProps) {
    const [step, setStep] = useState(1);
    const [jobTitle, setJobTitle] = useState(jobData.iJobTitle);
    const [jobDetails, setJobDetails] = useState(jobData.iJobDetails);
    const [location, setLocation] = useState(jobData.iLocation);
    const [workplaceOption, setWorkplaceOption] = useState(workplaceOptions[0]);
    const [worktypeOption, setWorkTypeOption] = useState(worktypeOptions[0]);
    const [currencyOption, setCurrencyOption] = useState(currencyOptions[0]);
    const [salaryMin, setSalaryMin] = useState(jobData.iSalaryMin);
    const [salaryMax, setSalaryMax] = useState(jobData.iSalaryMax);
    const [categoryOption, setCategoryOption] = useState(
        jobData.categoryOptions[0],
    );
    const [experienceLevel, setExperienceLevel] = useState(
        jobData.iExperienceLevel,
    );
    const [degreeLevelOption, setDegreeLevelOption] = useState(
        degreeLevelOptions[0],
    );
    const [fieldOfStudy, setFieldOfStudy] = useState(jobData.iFieldOfStudy);
    const [isEducationOptional, setIsEducationOptional] = useState(
        jobData.iIsEducationOptional,
    );
    const [skillWeight, setSkillWeight] = useState(jobData.iSkillWeight);
    const [educationWeight, setEducationWeight] = useState(
        jobData.iEducationWeight,
    );
    const [experienceWeight, setExperienceWeight] = useState(
        jobData.iExperienceWeight,
    );
    const [skills, setSkills] = useState<string[]>(jobData.iSkills);

    function setLocationOf(field: string, value: string) {
        setLocation((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function buildPayload(): CreateJobDto {
        return {
            title: jobTitle,
            description: jobDetails,
            workplaceType: workplaceOption.value,
            salaryMin: salaryMin || undefined,
            salaryMax: salaryMax || undefined,
            currency:
                salaryMax !== 0.0 || salaryMin !== 0.0
                    ? currencyOption.value
                    : undefined,
            isActive: true,
            location: location.country ? location : undefined,
            employmentType: worktypeOption.value,
            experienceLevel: experienceLevel || undefined,
            category: categoryOption.label,
            skillWeight: skillWeight || 34,
            educationWeight: educationWeight || 33,
            experienceWeight: experienceWeight || 33,
            skills: skills,
            educationRequirements: [
                {
                    degreeLevelCode: degreeLevelOption.value,
                    fieldOfStudy: fieldOfStudy || undefined,
                    isOptional: isEducationOptional,
                },
            ],
        };
    }

    async function handlePostJob() {
        const jobPostDetails = buildPayload();

        if (mode == "create") {
            try {
                await createJob(jobPostDetails);
            } catch (error: unknown) {
                if (!isRedirectError(error)) alert(error);
            }
        } else {
            try {
                await updateJobById(jobId!, jobPostDetails);
            } catch (error: unknown) {
                if (!isRedirectError(error)) alert(error);
            }
        }
    }

    function setAsNumber(setterFunc: (value: number) => void) {
        return (value: string) => setterFunc(parseFloat(value) || 0.0);
    }

    return (
        <div className="flex flex-col items-center gap-12 max-w-3xl px-4 my-12 mx-auto">
            {/* Progress Bar */}
            <div onClick={() => console.log(buildPayload())}>
                {step == 1 ? (
                    <div>Progress Cycle 1</div>
                ) : step == 2 ? (
                    <div>Progress Cycle 2</div>
                ) : (
                    <div>Progress Cycle 3</div>
                )}
            </div>

            {/* Form Body */}
            {step == 1 ? (
                <div className="flex flex-col gap-6 w-full">
                    {/* -- row 1 -- */}
                    {/* Job Title Textbox */}
                    <LabeledTextbox
                        label="Job Title"
                        placeholder="Enter a simple job title"
                        onChange={setJobTitle}
                        value={jobTitle}
                    />
                    {/* -- row 2 -- */}
                    {/* Location Textbox */}
                    <div className="flex justify-between">
                        <div className="w-10/31">
                            <LabeledTextbox
                                label="City"
                                placeholder="Ladkrabang"
                                onChange={(value: string) =>
                                    setLocationOf("city", value)
                                }
                                value={location.city}
                            />
                        </div>
                        <div className="w-10/31">
                            <LabeledTextbox
                                label="Province"
                                placeholder="Bangkok"
                                onChange={(value: string) =>
                                    setLocationOf("province", value)
                                }
                                value={location.province}
                            />
                        </div>
                        <div className="w-10/31">
                            <LabeledTextbox
                                label="Country"
                                placeholder="Thailand"
                                onChange={(value: string) =>
                                    setLocationOf("country", value)
                                }
                                value={location.country}
                            />
                        </div>
                    </div>
                    {/* -- row 3 -- */}
                    <div className="w-full flex justify-around">
                        {/* Workplace Option Dropdown */}
                        <div className="w-fit">
                            <LabeledDropdown
                                label="Workplace option"
                                options={workplaceOptions}
                                onChange={setWorkplaceOption}
                                selected={workplaceOption}
                            />
                        </div>
                        {/* Work Type Option Dropdown */}
                        <div className="">
                            <LabeledOptions
                                label="Work Type"
                                options={worktypeOptions}
                                onChange={setWorkTypeOption}
                                selected={worktypeOption}
                            />
                        </div>
                    </div>
                    {/* -- row 4 -- */}
                    <div className="flex w-full justify-around">
                        {/* Currency Option Dropdown */}
                        <div className="w-1/5">
                            <LabeledDropdown
                                label="Currency"
                                options={currencyOptions}
                                onChange={setCurrencyOption}
                                selected={currencyOption}
                            />
                        </div>

                        {/* Salary-FROM Textbox */}
                        <div className="w-3/8">
                            <LabeledTextbox
                                type="number"
                                label="From"
                                placeholder="Enter minimum pay"
                                onChange={setAsNumber(setSalaryMin)}
                                value={salaryMin.toString()}
                            />
                        </div>

                        {/* Salary-TO Textbox */}
                        <div className="w-3/8">
                            <LabeledTextbox
                                type="number"
                                label="To"
                                placeholder="Enter maximum pay"
                                onChange={setAsNumber(setSalaryMax)}
                                value={salaryMax.toString()}
                            />
                        </div>
                    </div>
                </div>
            ) : step == 2 ? (
                <div className="flex flex-col gap-6 w-full">
                    {/* -- row 1 -- */}
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <LabeledDropdown
                                label="Job Category"
                                options={jobData.categoryOptions}
                                onChange={setCategoryOption}
                                selected={categoryOption}
                            />
                        </div>
                        <div className="w-1/2">
                            <LabeledTextbox
                                label="Experience Level Required"
                                placeholder="Senior, Mid, Junior, ..."
                                onChange={setExperienceLevel}
                                value={experienceLevel}
                            />
                        </div>
                    </div>
                    {/* -- row 2 -- */}
                    <div className="flex flex-col gap-2">
                        <div className="flex w-full gap-4">
                            <div className="w-1/2">
                                <LabeledDropdown
                                    label="Degree level"
                                    options={degreeLevelOptions}
                                    selected={degreeLevelOption}
                                    onChange={setDegreeLevelOption}
                                />
                            </div>
                            <div className="w-1/2">
                                <LabeledTextbox
                                    label="Field of study"
                                    placeholder="Computer Science, Business Management"
                                    value={fieldOfStudy}
                                    onChange={setFieldOfStudy}
                                />
                            </div>
                        </div>
                        <div>
                            <LabeledCheckbox
                                label="Is Education Optional"
                                isChecked={isEducationOptional}
                                onClick={setIsEducationOptional}
                            />
                        </div>
                    </div>
                    {/* -- row 3 -- */}
                    {/* TODO: Education Requirements */}

                    <div className="flex w-full justify-around">
                        <div className="w-3/10">
                            <LabeledTextbox
                                label="Skill Weight"
                                type="number"
                                placeholder="40"
                                value={skillWeight.toString()}
                                onChange={setAsNumber(setSkillWeight)}
                            />
                        </div>
                        <div className="w-3/10">
                            <LabeledTextbox
                                label="Experience Weight"
                                type="number"
                                placeholder="30"
                                value={experienceWeight.toString()}
                                onChange={setAsNumber(setExperienceWeight)}
                            />
                        </div>
                        <div className="w-3/10">
                            <LabeledTextbox
                                label="Education Weight"
                                type="number"
                                placeholder="30"
                                value={educationWeight.toString()}
                                onChange={setAsNumber(setEducationWeight)}
                            />
                        </div>
                        <HoverableTips
                            symbol="?"
                            body="Skill Weight + Experience Weight + Education Weight = 100"
                        />
                    </div>

                    {/* -- row 4 -- */}
                    {/* TODO: Skill Requirements */}
                    <div className="flex flex-col gap-1 max-w-1/2">
                        <span className="text-heading-4 font-bold">
                            Preferred skills
                        </span>
                        <TextboxList values={skills} onChange={setSkills} />
                    </div>
                </div>
            ) : (
                <div className="w-full h-100">
                    <LabeledTextArea
                        label="Job Details (markdown supported)"
                        placeholder="Enter a simple job detail (markdown supported for layouting)"
                        value={jobDetails}
                        onChange={setJobDetails}
                    />
                </div>
            )}

            {/* Continue button */}
            {step == 1 ? (
                <div className="flex w-full justify-end">
                    <Button variant="secondary" onClick={() => setStep(2)}>
                        <div>Continue</div>
                        <ArrowRight width={36} height={36} />
                    </Button>
                </div>
            ) : step == 2 ? (
                <div className="flex w-full justify-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                        <ArrowRight
                            width={36}
                            height={36}
                            className="rotate-180"
                        />
                        <div>Back</div>
                    </Button>

                    {/* <Button variant="secondary" onClick={() => handlePostJob()}> */}
                    <Button variant="secondary" onClick={() => setStep(3)}>
                        <div>Continue</div>
                        <ArrowRight width={36} height={36} />
                    </Button>
                </div>
            ) : (
                <div className="flex w-full justify-between">
                    <Button variant="secondary" onClick={() => setStep(2)}>
                        <ArrowRight
                            width={36}
                            height={36}
                            className="rotate-180"
                        />
                        <div>Back</div>
                    </Button>
                    {/* <Button variant="secondary" onClick={() => handlePostJob()}> */}

                    <Button variant="secondary" onClick={handlePostJob}>
                        Post Job
                    </Button>
                </div>
            )}
        </div>
    );
}
