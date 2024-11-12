"use client"
import ShopName from "@/src/components/items/ShopName";
import ProductImage from "@/src/components/items/ProductImage";
import { AddToCartButton } from "@/src/components/items/AddToCartButton";
import ProductName from "@/src/components/items/ProductName";
import Price from "@/src/components/items/Price";
import CategoryTree from "@/src/components/items/CategoryTree";
import Description from "@/src/components/items/Description";
import QuantitySelector from "@/src/components/common/QuantitySelector";
import { useState } from "react";
import Item from "@/src/types/Item";
import Categories from "@/src/types/Categories";

const Items = () => {
    const itemInfo: Item = {
        seqExhibitId: 1,
        name: "ランニングシューズ",
        shopId: 1,
        categoryId: 1002,
        price: 7990,
        stock: 10,
        purchase_num: 0,
        imageUrl: "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png",
        description: "軽量で耐久性のあるソールを持つランニングシューズです。",
        isStopped: false
    };
    const shopInfo = { "shopId": 1, "name": "A店舗"};
    const categories: Categories = {
        id: 1002,
        name: "運動靴",
        parentCategories: [
            {
                id: 10,
                name: "スポーツ用品"
            }
        ]
    };

    const [value, setValue] = useState<number>(0);

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
                <div className="mx-5"><ShopName shopId={shopInfo.shopId} name = {shopInfo.name}></ShopName></div>
                <div className="md:flex mx-10">
                    {
                        itemInfo && 
                        <>
                            <div className="mx-5">
                                <ProductImage 
                                    imageUrl={itemInfo.imageUrl}
                                    alt={itemInfo.name}
                                >    
                                </ProductImage>
                            </div>
                            <div className="">
                                <ProductName itemName={itemInfo.name}></ProductName>
                                <div className="my-5"><Price value={7990}></Price></div>
                                <div className="flex md:flex-wrap gap-5">
                                    <QuantitySelector
                                        max={itemInfo.stock}
                                        value={value}
                                        min={0}
                                        setValue={setValue}
                                    ></QuantitySelector>
                                    <AddToCartButton isEnabled={itemInfo.isStopped}></AddToCartButton>    
                                </div>
                                <div className="my-5">
                                    <Description title="Description" message={itemInfo.description}></Description>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </>
    )
}
export default Items;
