import { api } from "../apiUtils";

export const profilesApi = {
    autofill: () => api.post<void, object>(`/profiles/autofill`, {}),
};
