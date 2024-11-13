import HttpClient from "@/src/util/HttpClient";
import Client from "./client";

const Items = async () => {
    const  lotNo = 1;
    const response = await HttpClient.get("GET", `http://localhost:8080/api/v1/items/${lotNo}`);
    const item = response.data;
    const shopId = item.shop_id;
    
    const shopInfo = (await HttpClient.get("GET", `http://localhost:8080/api/v1/shops/${shopId}`)).data;
    const categories = (await HttpClient.get("GET", `http://localhost:8080/api/v1/categories/${categoryId}`)).data;
    
    return (
        <>
            <Client
                itemInfo={item}
                shopInfo={shopInfo}
                categories={categories}
            ></Client>
        </>
    )
}
export default Items;
