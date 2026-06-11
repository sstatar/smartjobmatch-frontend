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
        // 💡 1. Backdrop: เติม pt-[env(safe-area-inset-top)] เผื่อที่ให้รอยแหว่งจอมือถือ
        // และใช้ h-[100dvh] เพื่อให้เต็มจอแบบพอดีเป๊ะ หักลบแถบเบราว์เซอร์แล้ว
        <div className="fixed inset-0 z-[100] flex items-center justify-center md:justify-end bg-black/50 backdrop-blur-sm p-0 md:p-4 h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            {/* Content Box: 
                💡 2. บนมือถือ (ค่าเริ่มต้น) บังคับให้สูงเต็มจอ h-full และไม่มีขอบมน (rounded-none)
                💡 3. บนจอคอม (md) ให้กลับมามีความสูงจำกัด max-h-[90vh] และมีขอบมน (rounded-2xl) เหมือนเดิม */}
            <div className="bg-secondary w-full max-w-[620px] h-full md:h-auto md:max-h-[90vh] rounded-none md:rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 shrink-0 gap-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                        {title}
                    </h2>
                    <div className="flex gap-3 md:gap-5 shrink-0">
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

                {/* Body (ไม่มีอะไรเปลี่ยน) */}
                <div className="p-4 md:p-6 overflow-y-auto flex-1 min-h-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
