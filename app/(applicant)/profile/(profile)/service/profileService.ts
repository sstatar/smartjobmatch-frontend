// ไฟล์: Profile/service/profileService.ts
import api from "@/lib/axios";
import { PersonalData } from "../(formUser)/(FromContent)/PersonalForm"; // import type มาใช้

// 1. ฟังก์ชันดึงข้อมูลโปรไฟล์ทั้งหมด (GET)
export const fetchUserProfile = async () => {
    // ⚠️ เปลี่ยน "/users/profile" เป็น Endpoint จริงของ Backend คุณนะครับ
    const response = await api.get("/users/profile"); 
    return response.data;
};

// 2. ฟังก์ชันอัปเดตข้อมูล Personal (PUT/PATCH)
export const updatePersonalInfo = async (data: PersonalData) => {
    // ⚠️ เปลี่ยน Endpoint ให้ตรงกับ Backend
    const response = await api.put("/users/personal", data); 
    return response.data;
};

// เผื่อฟังก์ชันอื่นๆ ไว้ทำทีหลังได้ครับ เช่น updateEducation, updateWork ฯลฯ