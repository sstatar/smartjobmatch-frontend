import InfoTag from "@/components/ui/InfoTag";
import IconGithub from "@/public/svgs/iconGithub.svg";
import IconLinkedin from "@/public/svgs/iconLinkedin.svg";
import IconMapPin from "@/public/svgs/iconMapMarker.svg";
import IconMail from "@/public/svgs/iconMail.svg";
import IconPhone from "@/public/svgs/iconPhone.svg";
import ProfilePictureSection from "@/app/(applicant)/(main)/profile/(profile)/(ProfileSectionDisplay)/(Content)/ProfilePictureSection";

export interface PersonalDataProps {
    firstName?: string;
    lastName?: string;
    address?: string;
    email: string;
    phone?: string;
    linkedInUrl?: string;
    githubUrl?: string;
    profilePictureUrl?: string | null;
}

export default function PersonalInfoDisplay({
    data,
}: {
    data: PersonalDataProps;
}) {
    const displayName =
        data.firstName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : "Name not provided";

    const infoItems = [
        { text: data.address, icon: IconMapPin },
        { text: data.email, icon: IconMail },
        { text: data.phone, icon: IconPhone },
        { text: data.linkedInUrl, icon: IconLinkedin },
        { text: data.githubUrl, icon: IconGithub },
    ];
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <ProfilePictureSection
                    key={data.profilePictureUrl ?? "no-avatar"}
                    initialUrl={data.profilePictureUrl}
                    displayName={displayName}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <h1 className="text-accent text-heading-4 font-bold">
                        {displayName}
                    </h1>

                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {infoItems.map(
                            (item, index) =>
                                item.text && (
                                    <InfoTag
                                        key={index}
                                        text={item.text}
                                        icon={item.icon}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
