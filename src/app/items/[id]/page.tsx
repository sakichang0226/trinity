import { 
    CategoryTree,
    ShopName,
    ProductDetailCard
} from "@/src/components/items/index"
import ItemService from "@/src/feature/service/ItemService";

type ParamsType = {
    id: number
}

interface ItemsProps {
    params: Promise<ParamsType>
}

const Items: React.FC<ItemsProps> = async ({ params }) => {
    const { id } = await params;
    const { itemInfo, shopInfo, categories } = await ItemService(id);

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
                        { itemInfo && <ProductDetailCard itemInfo={itemInfo}></ProductDetailCard> }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Items;
