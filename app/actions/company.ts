// company.ts
"use server";

import { ApiError, ApiErrorResponse } from "@/lib/api/apiError";
import {
    companiesApi,
    CreateCompanyDto,
} from "@/lib/api/endpoints/companiesApi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// แนะนำให้สร้าง Type สำหรับ Response กลับไป
export type CreateCompanyResponse =
    | { success: true }
    | { success: false; error: string; data?: ApiErrorResponse | null };

export async function createCompany(companyPayload: CreateCompanyDto) {
    try {
        await companiesApi.createCompany(companyPayload);
    } catch (error) {
        // หากเป็น ApiError ที่เราดักไว้ ให้ return ค่ากลับไปเลย
        if (error instanceof ApiError) {
            return {
                success: false,
                error: error.message,
                data: error.data ? JSON.parse(error.data) : null,
            };
        }

        // Error อื่นๆ นอกเหนือจากการเรียก API
        return {
            success: false,
            error: "An unexpected error occurred, please try again later",
        };
    }

    // redirect จะทำงานเมื่อ try ด้านบนสำเร็จ (เพราะถ้า error มันถูก return ออกไปแล้ว)
    // การวาง redirect ไว้นอก try/catch คือสิ่งที่ถูกต้องแล้วใน Next.js
    revalidatePath("/(employer)", "layout");
    redirect("/company/me");
}

export async function updateCompany(companyPayload: CreateCompanyDto) {
    try {
        await companiesApi.updateCompany(companyPayload);
    } catch (error) {
        // หากเป็น ApiError ที่เราดักไว้ ให้ return ค่ากลับไปเลย
        if (error instanceof ApiError) {
            return {
                success: false,
                error: error.message,
                data: error.data ? JSON.parse(error.data) : null,
            };
        }

        // Error อื่นๆ นอกเหนือจากการเรียก API
        return {
            success: false,
            error: "An unexpected error occurred, please try again later",
        };
    }

    // redirect จะทำงานเมื่อ try ด้านบนสำเร็จ (เพราะถ้า error มันถูก return ออกไปแล้ว)
    // การวาง redirect ไว้นอก try/catch คือสิ่งที่ถูกต้องแล้วใน Next.js
    redirect("/company/me");
}

export async function deleteCompany() {
    try {
        await companiesApi.deleteCompany();
    } catch (error) {
        // หากเป็น ApiError ที่เราดักไว้ ให้ return ค่ากลับไปเลย
        if (error instanceof ApiError) {
            return {
                success: false,
                error: error.message,
                data: error.data ? JSON.parse(error.data) : null,
            };
        }

        // Error อื่นๆ นอกเหนือจากการเรียก API
        return {
            success: false,
            error: "An unexpected error occurred, please try again later",
        };
    }

    // redirect จะทำงานเมื่อ try ด้านบนสำเร็จ (เพราะถ้า error มันถูก return ออกไปแล้ว)
    // การวาง redirect ไว้นอก try/catch คือสิ่งที่ถูกต้องแล้วใน Next.js
    redirect("/home");
}
