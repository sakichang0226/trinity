import { 
    CategoryTree,
    ShopName,
    ProductDetailCard
} from "@/src/components/items/index"
import ItemsApi from "@/src/feature/api/items/ItemsApi";
import ShopsApi from "@/src/feature/api/items/ShopsApi";
import CategoriesApi from "@/src/feature/api/items/CategoriesApi";
import Item from "@/src/types/Item";

const Items = async ({ params }) => {
    const { id } = await params;
    const itemInfo = await ItemsApi.fetchItemInfo(id);
    let shopInfo;
    let categories;

    if (typeof itemInfo !== "undefined") {
        const shopId = itemInfo?.shopId;
        const categoryId = itemInfo?.categoryId;
        shopInfo = await ShopsApi.fetchShopInfo(shopId);
        categories = await CategoriesApi.fetchCategoryInfo(categoryId);  
    } 

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div className="my-5">
                    <div className="my-2 mx-5">
                        {   
                            categories && 
                                <CategoryTree
                                    categoryId={categories.categoryId}
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
                        {itemInfo && <ProductDetailCard itemInfo={itemInfo}></ProductDetailCard>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Items;
