import axios from "axios";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { Result } from "../types/ApiResults";
import { CommonError, ErrorResponse } from "../types/Error";

export abstract class CommonApi<RQ, RS> {

    request: RQ;

    config = {
        baseURL : "http://localhost:8080",
        timeout: 30000,
        cors: true
    }

    client = axios.create(this.config);

    constructor(req: RQ) {
        this.request = req;
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                switch (error.response?.status) {
                    case 500:
                        return Promise.reject(error.response?.data);
                }
            }
        );
    }

    async fetch(method: HTTP_METHOD, endpoint: string): Promise<Result<RS, Error>> {
        let body: RS;
        const response = await this.client.request({
            method: method,
            url: endpoint
        });

        return response;
    }
}
 