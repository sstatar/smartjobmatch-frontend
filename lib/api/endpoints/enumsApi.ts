import { api } from "../apiUtils";

export interface Category {
    id: string;
    name: string;
}

export const enumsApi = {
    getCategories: () => api.get<Category[]>("/enums/categories"),

    // getJob: (id: string) => api.get<Job>(`/jobs/${id}`),

    // createJob: (data: CreateJobDTO) =>
    //     api.post<Job, CreateJobDTO>("/jobs", data),

    // updateJob: (id: string, data: Partial<CreateJobDTO>) =>
    //     api.patch<Job, Partial<CreateJobDTO>>(`/jobs/${id}`, data),

    // deleteJob: (id: string) => api.delete<void>(`/jobs/${id}`),
};
