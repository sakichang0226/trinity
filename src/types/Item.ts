interface Item {
    seqExhibitId: number;
    name: string;
    shopId: number;
    categoryId: number;
    price: number;
    imageUrl: string;
    description: string;
    isStopped: boolean;
    purchaseNum: number;
    stock: number;
}
export default Item;
