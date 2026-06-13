import InputBox from "@/components/ui/InputBox";
import { useState } from "react";
import { updatePersonalAction } from "../../service/profileAction";

export type PersonalData = {
    firstName?: string; // First Name
    lastName?: string; // Last Name
    phone?: string; // Phone
    country?: string; // Country/Region
    city?: string; // City
    county?: string; // County
    postalCode?: string; // Postal Code
    address?: string; // Address Line
    linkedInUrl?: string; // Linkedin URL
    githubUrl?: string; // Github URL
};

type PersonalFormProps = {
    initialData: PersonalData;
    onSaveSuccess?: () => void;
};

export default function PersonalForm({
    initialData,
    onSaveSuccess,
}: PersonalFormProps) {
    const [formData, setFormData] = useState<PersonalData>(initialData);

    const handleChange = (field: keyof PersonalData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.phone) {
            alert("Please fill in all required fields.");
            return;
        }

        const result = await updatePersonalAction({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            linkedInUrl: formData.linkedInUrl,
            githubUrl: formData.githubUrl,
        });

        if (result.success) {
            alert("Personal information updated!");
            if (onSaveSuccess) onSaveSuccess();
        } else {
            alert(result.error);
        }
    };

    return (
        <form
            id="side-panel-form"
            onSubmit={handleUpdate}
            // 💡 1. ปรับ p-5 เป็น p-0 md:p-5 เพราะตัวกล่อง SidePanel มีการเว้น Padding รอบนอกไว้อยู่แล้วครับ
            // การลดตรงนี้จะช่วยลดพื้นที่ว่างที่ซ้อนกันหนาเกินไปในจอมือถือลงได้ครับ
            className="bg-secondary p-0 md:p-5"
        >
            {/* 💡 2. ปรับจาก grid-cols-2 เป็น grid-cols-1 md:grid-cols-2
                - จอมือถือ: จะเรียงอินพุตทุกตัวเป็นแนวตั้งลงมา 1 คอลัมน์เต็มหน้าจอ พิมพ์ง่ายสบายตา
                - จอคอม (md): จะกางออกเป็น 2 คอลัมน์ เพื่อรักษาดีไซน์เดิมที่คุณวางไว้เป๊ะๆ ครับ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* แถวที่ 1 */}
                <InputBox
                    text="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                />
                <InputBox
                    text="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                />

                {/* แถวที่ 2 */}
                <InputBox
                    text="Phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                />

                {/* แถวที่ 6: Linkedin URL 
                    💡 3. เปลี่ยนจาก col-span-2 เป็น md:col-span-2 เพื่อให้มันขยายเต็มพื้นที่เฉพาะบนจอคอมพิวเตอร์ครับ */}
                <div className="md:col-span-2">
                    <InputBox
                        text="Linkedin URL"
                        value={formData.linkedInUrl}
                        onChange={(e) =>
                            handleChange("linkedInUrl", e.target.value)
                        }
                    />
                </div>

                {/* แถวที่ 7: Github URL */}
                {/* 💡 4. เปลี่ยนจาก col-span-2 เป็น md:col-span-2 เช่นเดียวกันครับ */}
                <div className="md:col-span-2">
                    <InputBox
                        text="Github URL"
                        value={formData.githubUrl}
                        onChange={(e) =>
                            handleChange("githubUrl", e.target.value)
                        }
                    />
                </div>
            </div>
        </form>
    );
}
