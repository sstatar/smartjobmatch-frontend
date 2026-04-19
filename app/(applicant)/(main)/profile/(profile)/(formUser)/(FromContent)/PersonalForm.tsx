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

// สมมติว่ารับ data เข้ามาเพื่อเอาข้อมูลเก่ามาแสดง (ถ้าไม่มีก็ไม่เป็นไร)
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

        // 2. ตรวจสอบข้อมูลบังคับก่อนส่ง
        if (!formData.firstName || !formData.lastName) {
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
            className="bg-secondary p-5"
        >
            {/* เปิดใช้งานตาราง 2 คอลัมน์ พร้อมช่องว่าง (gap) ระยะ 6 */}
            <div className="grid grid-cols-2 gap-6">
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
                {/* <InputBox 
                    text="Email" 
                    type="email" 
                    required 
                    defaultValue={initialData?.email || "65050859@kmitl.ac.th"} 
                /> */}
                <InputBox
                    text="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                />

                {/* แถวที่ 3 */}
                {/* <InputBox 
                    text="Country/Region" 
                    defaultValue="Thailand" 
                />
                <InputBox 
                    text="City" 
                    defaultValue="Lat Krabang, Bangkok" 
                /> */}

                {/* แถวที่ 4 */}
                {/* <InputBox 
                    text="County" 
                    defaultValue="" 
                />
                <InputBox 
                    text="Postal Code" 
                    defaultValue="10250" 
                /> */}

                {/* แถวที่ 5: Address Line (กว้างเต็มบรรทัด เลยต้องหุ้มด้วย col-span-2) */}
                {/* <div className="col-span-2">
                    <InputBox 
                        text="Address Line" 
                        defaultValue="64/17 ม.5 ต.คลองสะแก" 
                    />
                </div> */}

                {/* แถวที่ 6: Linkedin URL (บังคับกรอก + กว้างเต็มบรรทัด) */}
                <div className="col-span-2">
                    <InputBox
                        text="Linkedin URL"
                        value={formData.linkedInUrl}
                        onChange={(e) =>
                            handleChange("linkedInUrl", e.target.value)
                        }
                    />
                </div>

                {/* แถวที่ 7: Github URL (กว้างเต็มบรรทัด) */}
                <div className="col-span-2">
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
