import { api } from "../apiUtils";

export interface User {
    id: string;
    email: string;
    profilePictureUrl?: string;
    firstName?: string;
    lastName?: string;
    phome?: string;
    role: "APPLICANT" | "EMPLOYER";
    companyId?: string;
}

export const usersApi = {
    getMe: async () => api.get<User>("/users/me"),
};
