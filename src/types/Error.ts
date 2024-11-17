export type ErrorResponse<E> = {
    data: E;
}

export type CommonError = {
    error_code: string;
    message: string;
}
