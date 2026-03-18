import { api } from "../apiUtils";

export interface BookmarkResponse {
    savedAt: Date;
    userId: string;
    jobPostId: string;
}

export const bookmarksApi = {
    getMyBookmarkedJobIds: () => api.get<string[]>(`/bookmarks/me/ids`),

    createBookmark: (jobId: string) =>
        api.post<BookmarkResponse, { jobPostId: string }>(`/bookmarks`, {
            jobPostId: jobId,
        }),

    deleteBookmark: (jobId: string) => api.delete<void>(`/bookmarks/${jobId}`),
};
