import Pencil from "@/public/svgs/pencil.svg";

type WrapperProps = {
    title: string;
    onEdit: () => void;
    children: React.ReactNode; // ข้อมูลที่จะแสดงในแต่ละ Section
    isEmpty?: boolean; // เช็คว่ามีข้อมูลไหม
};

export default function ProfileSectionWrapper({
    title,
    onEdit,
    children,
    isEmpty,
}: WrapperProps) {
    if (isEmpty) return null;

    return (
        <div className="w-full max-w-[974px] px-6 pt-6 pb-4 md:py-6 flex flex-col items-center">
            
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onEdit}
                        className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
                    >
                        <Pencil className="w-5 h-5 text-accent" />
                    </button>
                </div>

                <div className="mb-6">{children}</div>
            </div>

            <div className="w-full max-w-[831px] border-b border-gray-200" />
        </div>
    );
}
