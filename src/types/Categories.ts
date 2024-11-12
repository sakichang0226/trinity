import Category from "./Category";

interface Categories {
    id: number;
    name: string;
    parentCategories: Category[]
}
export default Categories;
