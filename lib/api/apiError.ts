export interface ApiErrorResponse {
    message: JSON | string;
    error: string;
    statusCode: number;
}

export class ApiError extends Error {
    status: number;
    data?: string;

    constructor(status: number, message: string, data?: ApiErrorResponse) {
        super(message);
        this.status = status;
        this.data = JSON.stringify(data);
    }
}
