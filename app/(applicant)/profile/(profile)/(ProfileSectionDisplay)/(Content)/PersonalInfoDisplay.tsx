import InfoTag from "@/components/ui/InfoTag";
import IconGithub from "@/public/svgs/iconGithub.svg";
import IconLinkedin from "@/public/svgs/iconLinkedin.svg";
import IconMapPin from "@/public/svgs/iconMapMarker.svg";
import IconMail from "@/public/svgs/iconMail.svg";
import IconPhone from "@/public/svgs/iconPhone.svg";

interface PersonalData {
    firstName?: string;
    lastName?: string;
    address?: string;
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
}

export default function PersonalInfoDisplay({ data }: { data: PersonalData }) {
    const infoItems = [
        { text: data.address, icon: IconMapPin },
        { text: data.email, icon: IconMail },
        { text: data.phone, icon: IconPhone },
        { text: data.linkedin, icon: IconLinkedin },
        { text: data.github, icon: IconGithub },
    ];
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-accent text-heading-4 font-bold">
                {data.firstName && data.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : "Name not provided"}
            </h1>

            {/* 3. ส่วนแสดง InfoTags โดยใช้ flex-wrap เพื่อให้ขึ้นบรรทัดใหม่เมื่อจอกว้างไม่พอ */}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
                {infoItems.map(
                    (item, index) =>
                        // เช็คเงื่อนไข: ถ้ามีข้อมูล (item.text) ถึงจะแสดง InfoTag
                        item.text && (
                            <InfoTag
                                key={index}
                                text={item.text}
                                icon={item.icon}
                            />
                        ),
                )}
            </div>
        </div>
    );
}
