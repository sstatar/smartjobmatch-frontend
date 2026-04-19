"use client";
import Button from "@/components/ui/Button";

type ModalProps = {
    isOpen: boolean; // สถานะ เปิด หรือ ปิด
    onClose: () => void; // ฟังก์ชันปิด
    title: string; // หัวข้อป๊อปอัพ
    children: React.ReactNode; // เนื้อหาข้างในที่จะเปลี่ยนไปตาม Section
};

export default function SidePanel({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    if (!isOpen) return null;
    return (
        // Backdrop: พื้นหลังดำจางๆ ล็อคหน้าจอ
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/50 backdrop-blur-sm p-4">
            {/* Content Box: กล่องสีขาว */}
            <div className="bg-secondary w-full max-w-[620px] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header: ส่วนหัวที่มีปุ่มปิด */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <div className="flex gap-5">
                        <Button type="submit" form="side-panel-form">
                            Update
                        </Button>

                        <button
                            onClick={() => onClose()}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Body: ส่วนเนื้อหาที่จะเอาฟอร์มมาใส่ */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
}
