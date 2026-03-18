"use client";

import {
    createCompany,
    CreateCompanyResponse,
    updateCompany,
} from "@/app/actions/company";
import LabeledTextArea from "@/components/inputUi/LabeledTextArea";
import LabeledTextbox from "@/components/inputUi/LabeledTextbox";
import ProgressPoint from "@/components/ProgressPoint";
import Button from "@/components/ui/Button-2";
import { CreateCompanyDto } from "@/lib/api/endpoints/companiesApi";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import { useState } from "react";

export interface CompanyCreateFormData {
    iName?: string;
    iDescription?: string;
    iWebsite?: string;
    iLogoUrl?: string;
    iIndustry?: string;
}

export interface CompanyCreateFormProps {
    data: CompanyCreateFormData;
    mode?: "create" | "edit";
}

export default function CompanyCreateForm({
    data,
    mode = "create",
}: CompanyCreateFormProps) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState(data.iName || "");
    const [description, setDescription] = useState(data.iDescription);
    const [website, setWebsite] = useState(data.iWebsite);
    const [logoUrl, setLogoUrl] = useState(data.iLogoUrl);
    const [industry, setIndustry] = useState(data.iIndustry);

    function buildPayload(): CreateCompanyDto {
        return {
            name,
            description,
            website,
            logoUrl,
            industry,
        };
    }

    async function handleSubmit() {
        try {
            const payload = buildPayload();
            let result: CreateCompanyResponse;
            if (mode === "create") {
                result = await createCompany(payload);
            } else {
                result = await updateCompany(payload);
            }

            // เช็คว่าถ้ามี result กลับมาและ success เป็น false แปลว่าเกิด Error
            if (result && !result.success) {
                console.log("test here");
                console.log(result.data); // ตอนนี้จะแสดง Object data ที่ต้องการแล้ว

                // alert อาจจะแสดงเป็น [object Object] ให้ใช้ JSON.stringify ช่วย
                alert(JSON.stringify(result.data, null, 2));

                console.log("end test");
                return; // หยุดการทำงาน
            }

            // ถ้าสำเร็จ Next.js จะทำการ redirect ไปที่ /companies/me เองตามที่เขียนไว้ใน Server Action
        } catch (error) {
            // catch ตรงนี้จะเอาไว้จับแค่ Network Error หรือข้อผิดพลาดระดับร้ายแรงอื่นๆ
            console.error("Client Error:", error);
        }
    }

    return (
        <div className="flex flex-col items-center gap-8 max-w-3xl px-16 my-12 mx-auto">
            <ProgressPoint step={step} maxSteps={2} />

            {/* Step 1 */}
            {step == 1 ? (
                <div className="flex flex-col w-full gap-8">
                    <LabeledTextbox
                        label="Company name"
                        value={name}
                        placeholder="ABC company"
                        onChange={setName}
                        required={true}
                    />
                    <LabeledTextbox
                        label="Website url"
                        value={website}
                        placeholder="https://example.com"
                        onChange={setWebsite}
                    />
                    <LabeledTextbox
                        label="Image logo url"
                        value={logoUrl}
                        placeholder="https://example.com/logo.png"
                        onChange={setLogoUrl}
                    />
                    <LabeledTextbox
                        label="Industry"
                        value={industry}
                        placeholder="Example: Software, Finance, etc."
                        onChange={setIndustry}
                    />
                </div>
            ) : (
                <div className="w-full h-100">
                    <LabeledTextArea
                        label="Description (markdown supported)"
                        value={description}
                        placeholder="Describe your company"
                        onChange={setDescription}
                        required={false}
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
            ) : (
                <div className="flex w-full justify-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                        <ArrowRight
                            width={36}
                            height={36}
                            className="rotate-180"
                        />
                        <div>Back</div>
                    </Button>

                    <Button variant="secondary" onClick={handleSubmit}>
                        <div>Submit</div>
                    </Button>
                </div>
            )}
        </div>
    );
}
