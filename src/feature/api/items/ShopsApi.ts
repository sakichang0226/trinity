import { CommonApi } from "../CommonApi";
import ShopResponse from "@/src/types/api/ShopResponse";
import { DOMAIN } from "@/src/const/ClientValues";
import Shop from "@/src/types/Shop";

class ShopsApi extends CommonApi<unknown, ShopResponse> {

    async fetchShopInfo(id: number) {

        try {
            const response = await this.get(`${DOMAIN}/api/v1/shops/${id}`);
            const body = response.data;

            const shopInfo: Shop = {
                shopId: body.shop_id,
                name: body.name
            }
    
            return shopInfo

        } catch(error: any) {
            return 
        }

    }

}
export default new ShopsApi();