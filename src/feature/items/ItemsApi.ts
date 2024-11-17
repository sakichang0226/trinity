import HttpClient from "@/src/util/HttpClient";
import { DOMAIN } from "@/src/const/ClientValues";
import { CommonApi } from "@/src/feature/CommonApi";
import  Item  from "@/src/types/Item";
import ItemResponse from "@/src/types/ItemResponse";

class ItemsApi extends CommonApi<String, ItemResponse> {


    async fetchItemInfo(id: number) {
        const response = await this.fetch("GET", `${DOMAIN}/api/v1/items/${id}`);

        response.
        

    }

}
export default new ItemsApi("test");