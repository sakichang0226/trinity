import Category from "./Category";

interface Categories {
    categoryId: number;
    name: string;
    parentCategories: Category[]
}
export default Categories;
