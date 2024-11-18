import { DOMAIN } from "@/src/const/ClientValues";
import { CommonApi } from "@/src/feature/api/CommonApi";
import ItemResponse from "@/src/types/api/ItemResponse";
import Item from "@/src/types/Item";
import { notFound } from "next/navigation";


class ItemsApi extends CommonApi<unknown, ItemResponse> {

    async fetchItemInfo(id: number) {

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
            }
    
            return itemInfo

        } catch(error: any) {
            if (error.status == 404) {
                notFound();
            }
        }

    }

}
export default new ItemsApi();
