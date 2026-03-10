"use client";

import HoverableTips from "@/components/HoverableTips";
import LabeledCheckbox from "@/components/inputUi/LabeledCheckbox";
import LabeledDropdown from "@/components/inputUi/LabeledDropdown";
import LabeledOptions from "@/components/inputUi/LabeledOptions";
import LabeledTextArea from "@/components/inputUi/LabeledTextArea";
import LabeledTextbox from "@/components/inputUi/LabeledTextbox";
import TextboxList from "@/components/inputUi/TextboxList";
import Button from "@/components/ui/Button-2";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import { useState } from "react";

const workplaceOptions = [
    { value: "ON_SITE", label: "On-Site" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "REMOTE", label: "Remote" },
];
const worktypeOptions = [
    { value: "Full-time", label: "Full Time" },
    { value: "Part-time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
];
const currencyOptions = [
    { value: "THB", label: "THB" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
];
const categoryOptions = [
    { value: "1IT", label: "IT" },
    { value: "2Marketing", label: "Marketing" },
    { value: "3Sales", label: "Sales" },
    { value: "4Finance", label: "Finance" },
    { value: "5HR", label: "HR" },
    { value: "6IT", label: "IT" },
    { value: "7Marketing", label: "Marketing" },
    { value: "8Sales", label: "Sales" },
    { value: "9Finance", label: "Finance" },
    { value: "0HR", label: "HR" },
    { value: "11IT", label: "IT" },
    { value: "22Marketing", label: "Marketing" },
    { value: "33Sales", label: "Sales" },
    { value: "44Finance", label: "Finance" },
    { value: "55HR", label: "HR" },
    { value: "66IT", label: "IT" },
    { value: "77Marketing", label: "Marketing" },
    { value: "88Sales", label: "Sales" },
    { value: "99Finance", label: "Finance" },
    { value: "00HR", label: "HR" },
];
const degreeLevelOptions = [
    { value: "BACHELOR", label: "Bachelor's Degree" },
    { value: "MASTER", label: "Master's Degree" },
    { value: "DOCTORATE", label: "Doctoral Degree" },
    { value: "PRIMARY", label: "Primary Education Level" },
    { value: "SECONDARY", label: "Secondary Education Level" },
];
const isEducationOptionalData = false;
const skillsData = ["Java", "Python", "JavaScript", "HTML", "CSS"];

export default function Page() {
    const [step, setStep] = useState(1);
    const [jobDetails, setJobDetails] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [workplaceOption, setWorkplaceOption] = useState(workplaceOptions[0]);
    const [worktypeOption, setWorkTypeOption] = useState(worktypeOptions[0]);
    const [currencyOption, setCurrencyOption] = useState(currencyOptions[0]);
    const [salaryMin, setSalaryMin] = useState(0.0);
    const [salaryMax, setSalaryMax] = useState(0.0);
    const [categoryOption, setCategoryOption] = useState(categoryOptions[0]);
    const [experienceLevel, setExperienceLevel] = useState("");
    const [degreeLevelOption, setDegreeLevelOption] = useState(
        degreeLevelOptions[0],
    );
    const [fieldOfStudy, setFieldOfStudy] = useState("");
    const [isEducationOptional, setIsEducationOptional] = useState(
        isEducationOptionalData,
    );
    const [skillWeight, setSkillWeight] = useState(0.0);
    const [educationWeight, setEducationWeight] = useState(0.0);
    const [experienceWeight, setExperienceWeight] = useState(0.0);
    const [skills, setSkills] = useState<string[]>(skillsData);

    function handlePostJob() {
        const jobPostDetails = {
            title: jobTitle,
            description: jobDetails,
            workplaceType: workplaceOption.value,
            salaryMin: salaryMin,
            salaryMax: salaryMax,
            currency: currencyOption.value,
            isActive: true,
            location: {
                city: location.split(",")[0].trim(),
                province: location.split(",")[1].trim(),
                country: location.split(",")[2].trim(),
            },
            employmentType: worktypeOption.value,
            experienceLevel: experienceLevel,
            category: categoryOption.value,
            skillWeight: skillWeight,
            educationWeight: educationWeight,
            experienceWeight: experienceWeight,
            skills: skills,
            educationRequirements: [
                {
                    degreeLevelCode: degreeLevelOption.value,
                    fieldOfStudy: fieldOfStudy,
                    isOptional: isEducationOptional,
                },
            ],
        };

        console.log(jobPostDetails);
        alert("Post Job");
    }

    function setAsNumber(setterFunc: (value: number) => void) {
        return (value: string) => setterFunc(parseFloat(value) || 0.0);
    }

    return (
        <div className="flex flex-col items-center gap-12 max-w-2xl px-4 my-12 mx-auto">
            {/* Progress Bar */}
            {step == 1 ? (
                <div>Progress Cycle 1</div>
            ) : step == 2 ? (
                <div>Progress Cycle 2</div>
            ) : (
                <div>Progress Cycle 3</div>
            )}

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
                    <LabeledTextbox
                        label="Location"
                        placeholder="Enter a location in this format : city, province, country"
                        onChange={setLocation}
                        value={location}
                    />
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
                                options={categoryOptions}
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
