import HttpClient from "@/src/util/HttpClient";
import { DOMAIN } from "@/src/const/ClientValues";
import { 
    CategoryTree,
    ShopName,
    ProductDetailCard
} from "@/src/components/items/index"

const Items = async ({ params }) => {
    const { id } = await params;
    const itemInfo = (await HttpClient.get("GET", `${DOMAIN}/api/v1/items/${id}`)).data;
    const shopId = itemInfo.shop_id;
    const categoryId = itemInfo.category_id;
    
    let shopInfo;
    let categories; 

    try {
        shopInfo = (await HttpClient.get("GET", `${DOMAIN}/api/v1/shops/${shopId}`)).data;
        categories = (await HttpClient.get("GET", `${DOMAIN}/api/v1/categories/${categoryId}`)).data; 
    } catch(error) {

    }

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div className="my-5">
                    <div className="my-2 mx-5">
                        {   
                            categories && 
                                <CategoryTree
                                    id={categories.id}
                                    name={categories.name}
                                    parentCategories={ categories.parentCategories }
                                ></CategoryTree>
                        }
                    </div>
                    <div className="mx-5">
                        {
                            shopInfo && <ShopName shopId={shopInfo.shopId} name = {shopInfo.name}></ShopName>
                        }
                    </div>
                    <div className="md:flex mx-10">
                        <ProductDetailCard itemInfo={itemInfo}></ProductDetailCard>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Items;
