import InfoTag from "@/components/ui/InfoTag";
import IconGithub from "@/public/svgs/iconGithub.svg";
import IconLinkedin from "@/public/svgs/iconLinkedin.svg";
import IconMapPin from "@/public/svgs/iconMapMarker.svg";
import IconMail from "@/public/svgs/iconMail.svg";
import IconPhone from "@/public/svgs/iconPhone.svg";

interface PersonalData {
    name: string;
    address?: string;
    mail?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
}

export default function PersonalInfoDisplay({Data}: {Data: PersonalData}){ 
    const infoItems = [
        { text: Data.address, icon: IconMapPin },
        { text: Data.mail, icon: IconMail },
        { text: Data.phone, icon: IconPhone },
        { text: Data.linkedin, icon: IconLinkedin },
        { text: Data.github, icon: IconGithub },
    ];
    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-accent text-heading-4 font-bold">
                {Data.name || "ไม่ระบุชื่อ"}
            </h1>

            {/* 3. ส่วนแสดง InfoTags โดยใช้ flex-wrap เพื่อให้ขึ้นบรรทัดใหม่เมื่อจอกว้างไม่พอ */}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
                {infoItems.map((item, index) => (
                    // เช็คเงื่อนไข: ถ้ามีข้อมูล (item.text) ถึงจะแสดง InfoTag
                    item.text && (
                        <InfoTag 
                            key={index} 
                            text={item.text} 
                            icon={item.icon} 
                        />
                    )
                ))}
            </div>
        </div>
    )
}