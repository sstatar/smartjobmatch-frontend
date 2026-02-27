import axios from "axios";
import { API_BASE_URL } from "./api-config"; // 💡 ดึง URL จากไฟล์ที่คุณมีอยู่แล้วมาใช้!

// สร้างตัวแทนของ axios เพื่อตั้งค่าเริ่มต้น
const api = axios.create({
    baseURL: API_BASE_URL, // 💡 ใช้ตัวแปรที่ Import มา
    timeout: 10000, // ถ้าโหลดเกิน 10 วินาทีให้แจ้งเตือน Timeout
});

// ดักจับ Request ก่อนส่งออกไป (เอาไว้แนบ Token ยืนยันตัวตนในอนาคต)
api.interceptors.request.use(
    (config) => {
        // ตัวอย่างการแนบ Token (ถ้า Backend คุณต้องใช้)
        // const token = localStorage.getItem("accessToken");
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;