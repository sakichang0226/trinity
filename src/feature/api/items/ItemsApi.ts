import { DOMAIN } from "@/src/const/ClientValues";
import { API_ERROR999 } from "@/src/const/ErrorValues";
import { CommonApi } from "@/src/feature/api/CommonApi";
import { CommonError } from "@/src/types/api/ApiResults";
import ItemResponse from "@/src/types/api/ItemResponse";
import Item from "@/src/types/Item";
import { AxiosError } from "axios";

class ItemsApi extends CommonApi<ItemResponse> {

    async fetchItemInfo(id: number): Promise<Item | CommonError> {

        try {
            const response = await this.get(`${DOMAIN}/api/v1/items/${id}`);
            const body = response.data;

            const itemInfo: Item = {
                seqExhibitId: body.seq_exhibit_id,
                name: body.name,
                shopId: body.shop_id,
                categoryId: body.category_id,
                price: body.price,
                imageUrl: body.image_url,
                description: body.description,
                isStopped: body.is_stopped,
                purchaseNum: body.purchase_num,
                stock: body.stock
            } as Item
    
            return itemInfo

        } catch(error: unknown) {
            if (error instanceof AxiosError && error.response?.data) {
                const data = error.response.data
                return { error_code: data.error_code, message: data.message } as CommonError
            }

            return { error_code: API_ERROR999, message: "" } as CommonError
        }

    }
}
const itemsApiClient = new ItemsApi();
export default itemsApiClient
