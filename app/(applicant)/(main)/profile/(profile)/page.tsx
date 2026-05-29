import Navbar from "@/components/layout/navbar/Navbar";
import ProfileContent from "./(ProfileSectionDisplay)/ProfileContent";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { fetchUserProfileServer } from "./service/profileAction";
import {
    WorkExperienceResponse,
    EducationResponse,
    SkillResponse,
    PersonalResponse,
} from "./service/type";

export default async function page() {
    const profileData = await fetchUserProfileServer();

    if (!profileData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>ไม่พบข้อมูลโปรไฟล์ หรือ กรุณาล็อกอินใหม่</p>
            </div>
        );
    }

    const getMonthNumber = (monthString: string) => {
        if (!monthString || monthString === "null") return "";
        const months = [
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
        ];
        const monthNumber = (months.indexOf(monthString) ?? -2) + 1;
        return monthNumber.toString().padStart(2, "0");
    };

    const getYearFromISO = (isoString: string | null) => {
        if (!isoString) return null;
        const date = new Date(isoString);
        return isNaN(date.getTime()) ? null : date.getFullYear();
    };

    const getMonthFromISO = (isoString: string | null) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return "";

        return (date.getMonth() + 1).toString().padStart(2, "0");
    };

    return (
        <div className="h-screen flex flex-col">
            
            <div className="flex flex-1 overflow-hidden gap-4 justify-center px-8 mt-8">
                <Sidebar />

                <div className="flex flex-1 flex-col mt-2.5 width-full overflow-hidden">
                    <div>
                        <h1 className=" text-heading-200 font-(--weight-heading) text-accent mx-10 mb-1.5">
                            Profile
                        </h1>
                    </div>
                    <ProfileContent
                        personalData={{
                            firstName: profileData.user.firstName,
                            lastName: profileData.user.lastName,
                            email: profileData.user.email,
                            phone: profileData.user.phone,
                            linkedInUrl: profileData.linkedInUrl,
                            githubUrl: profileData.githubUrl,
                        }}
                        educationData={
                            profileData.educations
                                ? profileData.educations.map(
                                      (edu: EducationResponse) => ({
                                          id: edu.id,
                                          university: edu.university,
                                          degreeLevel: edu.degreeLevel,
                                          degreeLevelName: edu.degreeLevel.name,
                                          fieldOfStudy: edu.fieldOfStudy,
                                          startMonth: getMonthNumber(
                                              edu.startMonth,
                                          ),
                                          startYear: edu.startYear,
                                          graduationMonth: getMonthNumber(
                                              edu.graduationMonth,
                                          ),
                                          graduationYear: edu.graduationYear,
                                          gpa: edu.gpa,
                                          isCurrent: edu.isCurrent,
                                      }),
                                  )
                                : []
                        }
                        workData={
                            profileData.experiences
                                ? profileData.experiences.map(
                                      (exp: WorkExperienceResponse) => ({
                                          id: exp.id,
                                          jobTitle: exp.jobTitle,
                                          companyName: exp.companyName,
                                          summary: exp.summary,
                                          descriptions: exp.descriptions,
                                          startYear: getYearFromISO(
                                              exp.startDate,
                                          ),
                                          startMonth: getMonthFromISO(
                                              exp.startDate,
                                          ),

                                          endYear: getYearFromISO(exp.endDate),
                                          endMonth: getMonthFromISO(
                                              exp.endDate,
                                          ),
                                          isCurrent: exp.isCurrent,
                                      }),
                                  )
                                : []
                        }
                        skills={
                            profileData.skills
                                ? profileData.skills.map(
                                      (item: SkillResponse) => item.skill.name,
                                  )
                                : []
                        }
                    />
                </div>
            </div>
        </div>
    );
}
