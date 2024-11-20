import { DOMAIN } from "@/src/const/ClientValues";
import { CommonApi } from "@/src/feature/api/CommonApi";
import { CommonError } from "@/src/types/api/ApiResults";
import ItemResponse from "@/src/types/api/ItemResponse";
import Item from "@/src/types/Item";

class ItemsApi extends CommonApi<unknown, ItemResponse> {

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

        } catch(error: any) {

            if (error.data) {
                const data = error.data
                return { error_code: data.error_code, message: data.message } as CommonError
            }

            return { } as CommonError
        }

    }

}
export default new ItemsApi();
