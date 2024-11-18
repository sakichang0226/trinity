import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosResponseType, CommonError } from "../../types/api/ApiResults";
import { AxiosResponse } from "axios";

export abstract class CommonApi<RQ, RS extends AxiosResponseType> {

    config = {
        baseURL : "http://localhost:8080",
        timeout: 30000,
        cors: true
    }

    client: AxiosInstance

    constructor() {
        this.client = axios.create(this.config);
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<RS>) => {
                return Promise.reject({
                        status: error.response?.status,
                        data: error.response?.data
                });
            }
        );
    }

    async get(endpoint: string, params?: AxiosRequestConfig<RS>): Promise<AxiosResponse<RS>> {
        const response = await this.client.get<RS>(endpoint, params);

        if (response.status != 200) {
            response.status
        }

        return response
    }
}
 