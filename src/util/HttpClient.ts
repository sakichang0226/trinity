import axios from "axios";
import { HTTP_METHOD } from "next/dist/server/web/http";

const config = {
    baseURL : "http://localhost:8080",
    timeout: 30000,
    cors: true
}

const client = axios.create(config);

class HttpClient {

    get(method: HTTP_METHOD, endpoint: string) {  
        return client.request({
                method: method,
                url: endpoint
        });
    }

}

export default new HttpClient();