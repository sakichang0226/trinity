export interface AxiosResponseType {
};

export interface CommonError extends AxiosResponseType {
    error_code: string;
    message: string;
}
