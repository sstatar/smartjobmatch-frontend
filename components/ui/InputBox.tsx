import React from "react";

type InputBoxProps = {
    text: string;
    type?: string;           // ประเภทช่องกรอก เช่น email, tel, month
    placeholder?: string;    // ข้อความจางๆ
    defaultValue?: string;   // ข้อมูลเก่า (ใช้สำหรับฟอร์มแบบธรรมดา)
    required?: boolean;
    value?: string;          // ข้อมูลแบบผูก State (ใช้สำหรับ Dynamic Form)
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // ฟังก์ชันเวลามีการพิมพ์
    disabled?: boolean;      // เพิ่มอันนี้ สำหรับปิดช่องกรอก (เช่น ตอนติ๊กกำลังศึกษาอยู่)
};

export default function InputBox({ 
    text, 
    type = "text", 
    placeholder, 
    defaultValue, 
    required = false,
    value,
    onChange, // เปลี่ยนเป็น onChange (C ใหญ่)
    disabled = false
}: InputBoxProps) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-accent truncate">
                {required && <span className="text-red-500 ml-1">*</span>}
                {text}
            </span>
            
            {/* เพิ่มเงื่อนไขเปลี่ยนสีพื้นหลัง ถ้าถูก disabled ไว้ จะได้ดูรู้ว่าพิมพ์ไม่ได้ */}
            <div className={`flex items-center rounded-sm overflow-hidden border border-transparent transition-colors ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-accent-2 focus-within:border-accent'}`}>
                <input 
                    onChange={onChange}
                    value={value}   // 2020-01
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    disabled={disabled} // สั่งปิดช่องกรอก
                    className="px-3 py-2 bg-transparent text-gray-800 focus:outline-none placeholder:text-gray-400 w-full disabled:cursor-not-allowed" 
                />
            </div>
        </div>
    );
}