import ReactMarkdown from "react-markdown";

interface JobDetailCardProps {
    content: string;
}

export default function JobDetailCard({ content }: JobDetailCardProps) {
    return (
        // 1. เพิ่ม bg-white และ shadow-sm ให้ดูเป็นการ์ดที่ลอยขึ้นมานิดๆ
        // 2. ขยาย Padding บนจอใหญ่ (sm:p-6 md:p-8) ให้เนื้อหาไม่อึดอัด
        <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 border border-gray-300 rounded-lg bg-white shadow-sm w-full">
            {/* 3. เปลี่ยนจาก <h1> เป็น <h2> ตามหลักโครงสร้าง HTML (เพราะ <h1> ควรมีแค่หัวข้อหลักอันเดียวในหน้า) */}
            {/* 4. เพิ่มเส้นใต้บางๆ (border-b pb-4) ให้แยกส่วนหัวข้อกับเนื้อหาชัดเจน */}
            <h2 className="text-heading-3 font-semibold text-gray-900 border-b border-gray-100 pb-4">
                Job Details
            </h2>

            {/* 5. ใส่ break-words ป้องกันลิงก์ยาวๆ ทะลุจอตอนดูบนมือถือ */}
            <div className="markdown text-gray-700 leading-relaxed break-words prose max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
}
