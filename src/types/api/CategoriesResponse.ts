interface ParentCategory {
    id: number;
    name: string;
}

interface CategoriesResponse {
    category_id: number;
    name: string;
    parent_categories: ParentCategory[]
}
export default CategoriesResponse;
