"use client";

import { createJob, updateJobById } from "@/app/actions/job";
import HoverableTips from "@/components/ui/HoverableTips";
import LabeledCheckbox from "@/components/ui/inputUi/LabeledCheckbox";
import LabeledDropdown from "@/components/ui/inputUi/LabeledDropdown";
import LabeledOptions from "@/components/ui/inputUi/LabeledOptions";
import LabeledTextArea from "@/components/ui/inputUi/LabeledTextArea";
import LabeledTextbox from "@/components/ui/inputUi/LabeledTextbox";
import TextboxList from "@/components/ui/inputUi/TextboxList";
import ProgressPoint from "@/components/applicant/ProgressPoint";
import Button from "@/components/ui/Button-2";
import { ApiError } from "@/lib/api/apiError";
import {
    CreateJobDto,
    Currency,
    DegreeLevelCode,
    EmploymentType,
    WorkplaceType,
} from "@/lib/api/endpoints/jobsApi";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState } from "react";

const workplaceTypeOptions: Option[] = [
    { value: "ON_SITE", label: "On-Site" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "REMOTE", label: "Remote" },
];
const employmentTypeOptions: Option[] = [
    { value: "Full-time", label: "Full Time" },
    { value: "Part-time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
];
const currencyOptions: Option[] = [
    { value: "THB", label: "THB" },
    { value: "USD", label: "USD" },
];
const degreeLevelOptions = Object.entries(DegreeLevelCode).map(
    ([key, value]) => ({
        value: key,
        label: value,
    }),
);

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
    iWorkplaceType: WorkplaceType;
    iEmploymentType: EmploymentType;
    iSalaryMin: number;
    iSalaryMax: number;
    iCurrency: "THB" | "USD";
    iIsActive: boolean;
    iCategory: string;
    iExperienceLevel: string;
    iDegreeLevelCode: keyof typeof DegreeLevelCode;
    iFieldOfStudy: string;
    iIsEducationOptional: boolean;
    iSkillWeight: number;
    iEducationWeight: number;
    iExperienceWeight: number;
    iSkills: string[];
}
export interface JobCreateFormProps {
    jobData: JobData;
    categoryOptions: Option[];
    mode?: Mode;
    jobId?: string;
}

export default function JobCreateForm({
    jobData,
    categoryOptions,
    mode = "create",
    jobId,
}: JobCreateFormProps) {
    const [step, setStep] = useState(1);
    const [jobTitle, setJobTitle] = useState(jobData.iJobTitle);
    const [jobDetails, setJobDetails] = useState(jobData.iJobDetails);
    const [location, setLocation] = useState(jobData.iLocation);
    const [workplaceTypeOption, setWorkplaceTypeOption] = useState(
        jobData.iWorkplaceType
            ? workplaceTypeOptions.filter(
                  (option) => option.value === jobData.iWorkplaceType,
              )[0]
            : workplaceTypeOptions[0],
    );
    const [employmentTypeOption, setEmploymentTypeOption] = useState(
        jobData.iEmploymentType
            ? employmentTypeOptions.filter(
                  (option) => option.value === jobData.iEmploymentType,
              )[0]
            : employmentTypeOptions[0],
    );
    const [currencyOption, setCurrencyOption] = useState(
        jobData.iCurrency
            ? currencyOptions.filter(
                  (option) => option.value === jobData.iCurrency,
              )[0]
            : currencyOptions[0],
    );
    const [salaryMin, setSalaryMin] = useState(jobData.iSalaryMin);
    const [salaryMax, setSalaryMax] = useState(jobData.iSalaryMax);
    const [isActive, setIsActive] = useState(jobData.iIsActive);
    const [categoryOption, setCategoryOption] = useState(
        jobData.iCategory
            ? categoryOptions.filter(
                  (option) => option.label === jobData.iCategory,
              )[0]
            : categoryOptions[0],
    );
    const [experienceLevel, setExperienceLevel] = useState(
        jobData.iExperienceLevel,
    );
    const [degreeLevelOption, setDegreeLevelOption] = useState(
        jobData.iDegreeLevelCode
            ? degreeLevelOptions.filter(
                  (option) => option.value === jobData.iDegreeLevelCode,
              )[0]
            : degreeLevelOptions[0],
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
            workplaceType: workplaceTypeOption.value as WorkplaceType,
            salaryMin: salaryMin || undefined,
            salaryMax: salaryMax || undefined,
            currency:
                salaryMax !== 0.0 || salaryMin !== 0.0
                    ? (currencyOption.value as Currency)
                    : undefined,
            isActive: isActive,
            location: location.country ? location : undefined,
            employmentType: employmentTypeOption.value as EmploymentType,
            experienceLevel: experienceLevel || undefined,
            category: categoryOption.label,
            skillWeight: skillWeight || 34,
            educationWeight: educationWeight || 33,
            experienceWeight: experienceWeight || 33,
            skills: skills,
            educationRequirements: [
                {
                    degreeLevelCode:
                        degreeLevelOption.value as keyof typeof DegreeLevelCode,
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
                const result = await createJob(jobPostDetails);
                if (result.error) alert(result.error);
            } catch (error: unknown) {
                if (!isRedirectError(error)) alert(error);
            }
        } else {
            try {
                const result = await updateJobById(jobId!, jobPostDetails);
                if (result.error) alert(result.error);
            } catch (_) {}
        }
    }

    function setAsNumber(setterFunc: (value: number) => void) {
        return (value: string) => setterFunc(parseFloat(value) || 0.0);
    }
    function setDegreeLevelAsDegreeLevelCode(option: Option) {
        setDegreeLevelOption({
            value: option.value,
            label: option.label as DegreeLevelCode,
        });
    }

    return (
        // ปรับ padding ให้เล็กลงบนมือถือ
        <div className="flex flex-col items-center gap-8 md:gap-12 max-w-3xl px-4 md:px-8 mb-12 mx-auto w-full">
            {/* Progress Bar */}
            <ProgressPoint step={step} maxSteps={3} />

            {/* Form Body */}
            {step == 1 ? (
                <div className="flex flex-col gap-6 w-full">
                    {/* -- row 1 -- */}
                    <LabeledTextbox
                        label="Job Title"
                        placeholder="Enter a simple job title"
                        onChange={setJobTitle}
                        value={jobTitle}
                        required={true}
                    />

                    {/* -- row 2: Location (ซ้อนกันบนมือถือ, เรียง 3 คอลัมน์บนคอม) -- */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="w-full md:w-[31%]">
                            <LabeledTextbox
                                label="City"
                                placeholder="Ladkrabang"
                                onChange={(value: string) =>
                                    setLocationOf("city", value)
                                }
                                value={location.city}
                            />
                        </div>
                        <div className="w-full md:w-[31%]">
                            <LabeledTextbox
                                label="Province"
                                placeholder="Bangkok"
                                onChange={(value: string) =>
                                    setLocationOf("province", value)
                                }
                                value={location.province}
                            />
                        </div>
                        <div className="w-full md:w-[31%]">
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

                    {/* -- row 3: Workplace & Employment Type (ซ้อนกันบนมือถือ, เรียง 2 คอลัมน์บนคอม) -- */}
                    <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                        <div className="w-full md:w-[48%]">
                            <LabeledDropdown
                                label="Workplace option"
                                options={workplaceTypeOptions}
                                onChange={setWorkplaceTypeOption}
                                selected={workplaceTypeOption}
                            />
                        </div>
                        <div className="w-full md:w-[48%]">
                            <LabeledOptions
                                label="Work Type"
                                options={employmentTypeOptions}
                                onChange={setEmploymentTypeOption}
                                selected={employmentTypeOption}
                            />
                        </div>
                    </div>

                    {/* -- row 4: Currency & Salary (ซ้อนกันบนมือถือ, เรียงแนวนอนบนคอม) -- */}
                    <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                        <div className="w-full md:w-1/4">
                            <LabeledDropdown
                                label="Currency"
                                options={currencyOptions}
                                onChange={setCurrencyOption}
                                selected={currencyOption}
                            />
                        </div>
                        <div className="w-full md:w-[35%]">
                            <LabeledTextbox
                                type="number"
                                label="From"
                                placeholder="Enter minimum pay"
                                onChange={setAsNumber(setSalaryMin)}
                                value={salaryMin.toString()}
                            />
                        </div>
                        <div className="w-full md:w-[35%]">
                            <LabeledTextbox
                                type="number"
                                label="To"
                                placeholder="Enter maximum pay"
                                onChange={setAsNumber(setSalaryMax)}
                                value={salaryMax.toString()}
                            />
                        </div>
                    </div>

                    {/* -- row 5 -- */}
                    <div>
                        <LabeledCheckbox
                            label="Is this job active?"
                            isChecked={isActive}
                            onClick={setIsActive}
                        />
                    </div>
                </div>
            ) : step == 2 ? (
                <div className="flex flex-col gap-6 w-full">
                    {/* -- row 1 (ซ้อนกันบนมือถือ, เรียง 2 คอลัมน์บนคอม) -- */}
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <div className="w-full md:w-1/2">
                            <LabeledDropdown
                                label="Job Category"
                                options={categoryOptions}
                                onChange={setCategoryOption}
                                selected={categoryOption}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <LabeledTextbox
                                label="Experience Level Required"
                                placeholder="Senior, Mid, Junior, ..."
                                onChange={setExperienceLevel}
                                value={experienceLevel}
                            />
                        </div>
                    </div>

                    {/* -- row 2 (ซ้อนกันบนมือถือ, เรียง 2 คอลัมน์บนคอม) -- */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row w-full gap-4">
                            <div className="w-full md:w-1/2">
                                <LabeledDropdown
                                    label="Degree level"
                                    options={degreeLevelOptions}
                                    selected={degreeLevelOption}
                                    onChange={setDegreeLevelAsDegreeLevelCode}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
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

                    {/* -- row 3: Weights (กลับมาสมมาตรแบบ 3 กล่องเท่ากันแล้ว ✨) -- */}
                    <div className="flex flex-col md:flex-row w-full justify-between items-start gap-4">
                        <div className="w-full md:w-[31%]">
                            <LabeledTextbox
                                label="Skill Weight"
                                type="number"
                                placeholder="40"
                                value={skillWeight.toString()}
                                onChange={setAsNumber(setSkillWeight)}
                            />
                        </div>
                        <div className="w-full md:w-[31%]">
                            <LabeledTextbox
                                label="Experience Weight"
                                type="number"
                                placeholder="30"
                                value={experienceWeight.toString()}
                                onChange={setAsNumber(setExperienceWeight)}
                            />
                        </div>
                        {/* ใส่ relative ไว้ที่กล่องสุดท้าย เพื่อให้ปุ่ม ? ยึดเกาะไว้ที่ขวาสุดของกล่องนี้ */}
                        <div className="w-full md:w-[31%] relative">
                            <LabeledTextbox
                                label="Education Weight"
                                type="number"
                                placeholder="30"
                                value={educationWeight.toString()}
                                onChange={setAsNumber(setEducationWeight)}
                            />
                            {/* จัดปุ่ม ? ให้ลอยอยู่ด้านขวา (ใช้ top-8 หรือ top-9 เพื่อให้มันหลบ Label ลงมาอยู่ระดับเดียวกับช่องกรอก) */}
                            <div className="mt-2 md:mt-0 md:absolute md:-right-7 md:top-8">
                                <HoverableTips
                                    symbol="?"
                                    body="Skill Weight + Experience Weight + Education Weight = 100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* -- row 4: Skills -- */}
                    <div className="flex flex-col gap-1 w-full md:w-1/2">
                        <span className="text-heading-4 font-bold">
                            Preferred skills
                        </span>
                        <TextboxList
                            values={skills}
                            icon="🗑"
                            onChange={setSkills}
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    {/* ปรับความสูงของกล่องข้อความให้ยืดหยุ่น */}
                    <LabeledTextArea
                        label="Job Details (markdown supported)"
                        placeholder="Enter a simple job detail (markdown supported for layouting)"
                        value={jobDetails}
                        onChange={setJobDetails}
                    />
                </div>
            )}

            {/* ส่วนปุ่มกด Navigation */}
            {step == 1 ? (
                <div className="flex w-full justify-end">
                    <Button variant="secondary" onClick={() => setStep(2)}>
                        <div>Continue</div>
                        <ArrowRight width={36} height={36} />
                    </Button>
                </div>
            ) : step == 2 ? (
                <div className="flex w-full justify-between gap-4">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                        <ArrowRight
                            width={36}
                            height={36}
                            className="rotate-180"
                        />
                        <div>Back</div>
                    </Button>
                    <Button variant="secondary" onClick={() => setStep(3)}>
                        <div>Continue</div>
                        <ArrowRight width={36} height={36} />
                    </Button>
                </div>
            ) : (
                <div className="flex w-full justify-between gap-4">
                    <Button variant="secondary" onClick={() => setStep(2)}>
                        <ArrowRight
                            width={36}
                            height={36}
                            className="rotate-180"
                        />
                        <div>Back</div>
                    </Button>
                    <Button variant="secondary" onClick={handlePostJob}>
                        {mode === "edit" ? "Update Job" : "Post Job"}
                    </Button>
                </div>
            )}
        </div>
    );
}
