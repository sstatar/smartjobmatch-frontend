import Sidebar from "@/components/layout/sidebar/Sidebar";
import ButtonSecond from "@/components/ui/Button-2";
import { logout } from "@/app/actions/auth";

export default async function page() {


    
    return (
        <div className="h-screen flex flex-col mt-8">
            <div className="flex flex-1 overflow-hidden gap-4 justify-center px-8">
                <Sidebar />

                <div className="flex flex-1 flex-col mt-2.5 width-full overflow-hidden">
                    <div>
                        <h1 className=" text-heading-200 font-(--weight-heading) text-accent mx-10 mb-1.5">
                            Account Setting
                        </h1>

                        <div className="flex bg-accent-2 p-6 rounded-lg">
                            <div className="flex bg-secondary w-full rounded-3 p-6">
                            <ButtonSecond variant="tertiary" onClick={logout}>Log out</ButtonSecond>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
