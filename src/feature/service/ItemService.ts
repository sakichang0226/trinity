import itemsApiClient from "../api/items/ItemsApi"
import shopsApiClient from "../api/items/ShopsApi"
import categoriesApiClient  from "../api/items/CategoriesApi"
import Item from "@/src/types/Item"
import Shop from "@/src/types/Shop"
import Categories from "@/src/types/Categories"
import { notFound } from "next/navigation"
import { API_ERROR001, API_ERROR002, ERROR_CODE } from "@/src/const/ErrorValues"
import { CommonError } from "@/src/types/api/ApiResults"

const ItemService = async (id: number) => { 
    const itemInfo: Item | CommonError = await itemsApiClient.fetchItemInfo(id);


    if (ERROR_CODE in itemInfo) {
        switch(itemInfo.error_code) {
            case API_ERROR001: notFound();
            case API_ERROR002: notFound();
        }
        throw new Error()
    }

    const shopId: number = itemInfo.shopId;
    const categoryId: number = itemInfo.categoryId;
    const shopInfo: Shop | undefined = await shopsApiClient.fetchShopInfo(shopId);
    const categories: Categories | undefined = await categoriesApiClient.fetchCategoryInfo(categoryId);  

    return {
        itemInfo: itemInfo,
        shopInfo: shopInfo,
        categories: categories 
    }
}
export default ItemService;
