import ButtonSecond from "@/components/ui/Button-2";
import { logout } from "@/app/actions/auth";

export default async function page() {
    return (
        <div className="min-h-[80vh] flex flex-col">
            <div className="flex flex-1 flex-col mt-2.5 w-full overflow-hidden">
                <div>
                    <h1 className="text-heading-200 font-(--weight-heading) text-accent mx-4 md:mx-10 mb-2 md:mb-1.5">
                        Account Setting
                    </h1>

                    {/* 💡 เพิ่ม mx-4 md:mx-10 เพื่อให้ขอบซ้ายขวาตรงกับบรรทัด Header (Account Setting) พอดี */}
                    <div className="flex bg-accent-2  p-4 md:p-6 rounded-xl shadow-sm">
                        <div className="flex bg-secondary w-full rounded-lg p-6 md:p-6">
                            <form action={logout}>
                                <ButtonSecond
                                    variant="tertiary"
                                    type="submit"
                                    // 💡 ใช้ w-fit! (กว้างพอดีคำ), h-10! (ลดความสูง), px-6! (ลดขอบข้าง), และ text-sm! (ลดขนาดฟอนต์)
                                    className="w-fit! h-10! px-6! text-sm! md:text-xl! rounded-lg!"
                                >
                                    Log out
                                </ButtonSecond>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
