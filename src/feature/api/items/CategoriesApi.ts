import { CommonApi } from "../CommonApi";
import { DOMAIN } from "@/src/const/ClientValues";
import Categories from "@/src/types/Categories";
import CategoriesResponse from "@/src/types/api/CategoriesResponse";

class CategoriesApi extends CommonApi<CategoriesResponse> {

    async fetchCategoryInfo(id: number) {

        try {
            const response = await this.get(`${DOMAIN}/api/v1/categories/${id}`);
            const body = response.data;

            const categoryInfo: Categories = {
                categoryId: body.category_id,
                name: body.name,
                parentCategories: body.parent_categories
            }
    
            return categoryInfo

        } catch(error) {
            if (error instanceof Error) {
                console.warn(error);
            }
            return 
        }

    }

}
const categoriesApiClient = new CategoriesApi();
export default categoriesApiClient