import InputBox from "@/components/ui/InputBox"

export type PersonalData = {
    name?: string;          // First Name
    lastName?: string;      // Last Name
    mail?: string;          // Email
    phone?: string;         // Phone
    country?: string;       // Country/Region
    city?: string;          // City
    county?: string;        // County
    postalCode?: string;    // Postal Code
    address?: string;       // Address Line
    linkedin?: string;      // Linkedin URL
    github?: string;        // Github URL
};

type PersonalFormProps = {
    data?: PersonalData; // แทนที่คำว่า any ด้วย PersonalData
    onSaveSuccess?: () => void;
};


// สมมติว่ารับ data เข้ามาเพื่อเอาข้อมูลเก่ามาแสดง (ถ้าไม่มีก็ไม่เป็นไร)
export default function PersonalForm({ data, onSaveSuccess }: PersonalFormProps) {

const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault(); // กันหน้าเว็บกระพริบ
        alert("กำลังบันทึกข้อมูล Personal...");
        if (onSaveSuccess) onSaveSuccess(); // สั่งปิดหน้าต่าง
    };
    
    return (
        <form id="side-panel-form" onSubmit={handleUpdate} className="bg-secondary p-5">
            
            {/* เปิดใช้งานตาราง 2 คอลัมน์ พร้อมช่องว่าง (gap) ระยะ 6 */}
            <div className="grid grid-cols-2 gap-6">
                
                {/* แถวที่ 1 */}
                <InputBox 
                    text="First Name" 
                    required 
                    defaultValue={data?.name || "SASIPORN"} 
                />
                <InputBox 
                    text="Last Name" 
                    required 
                    defaultValue={data?.lastName || "CHATTHONGCHAI"} 
                />

                {/* แถวที่ 2 */}
                <InputBox 
                    text="Email" 
                    type="email" 
                    required 
                    defaultValue={data?.mail || "65050859@kmitl.ac.th"} 
                />
                <InputBox 
                    text="Phone" 
                    type="tel" 
                    required 
                    defaultValue={data?.phone || "062-8393550"} 
                />

                {/* แถวที่ 3 */}
                <InputBox 
                    text="Country/Region" 
                    defaultValue="Thailand" 
                />
                <InputBox 
                    text="City" 
                    defaultValue="Lat Krabang, Bangkok" 
                />

                {/* แถวที่ 4 */}
                <InputBox 
                    text="County" 
                    defaultValue="" 
                />
                <InputBox 
                    text="Postal Code" 
                    defaultValue="10250" 
                />

                {/* แถวที่ 5: Address Line (กว้างเต็มบรรทัด เลยต้องหุ้มด้วย col-span-2) */}
                <div className="col-span-2">
                    <InputBox 
                        text="Address Line" 
                        defaultValue="64/17 ม.5 ต.คลองสะแก" 
                    />
                </div>

                {/* แถวที่ 6: Linkedin URL (บังคับกรอก + กว้างเต็มบรรทัด) */}
                <div className="col-span-2">
                    <InputBox 
                        text="Linkedin URL" 
                        required
                        defaultValue={data?.linkedin || "https://www.linkedin.com/in/sasi-chat-657a64317/"} 
                    />
                </div>

                {/* แถวที่ 7: Github URL (กว้างเต็มบรรทัด) */}
                <div className="col-span-2">
                    <InputBox 
                        text="Github URL" 
                        defaultValue={data?.github} 
                    />
                </div>

            </div>
            
        </form>
    )
}