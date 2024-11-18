import { AxiosResponseType } from "./ApiResults";

interface ItemResponse extends AxiosResponseType {
    seq_exhibit_id: number;
    name: string;
    shop_id: number;
    category_id: number;
    price: number;
    image_url: string;
    description: string;
    is_stopped: boolean;
    purchase_num: number;
    stock: number;
    error_code: string;
    message: string;
}
export default ItemResponse;