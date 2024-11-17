import Category from "./Category";

interface Categories {
    category_id: number;
    name: string;
    parent_categories: Category[]
}
export default Categories;
