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
import Categories from "@/src/types/Categories";
import Item from "@/src/types/Item";
import Shop from "@/src/types/Shop";

const Client = (props:
    {
        categories: Categories,
        shopInfo: Shop,
        itemInfo: Item,
    }
) => {
    
    const itemInfo = props.itemInfo;
    const shopInfo = props.shopInfo;
    const categories = props.categories;

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
                    {
                        shopInfo && <div className="mx-5"><ShopName shopId={shopInfo.shopId} name = {shopInfo.name}></ShopName></div>
                    }
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
                                    <div className="my-5"><Price value={itemInfo.price}></Price></div>
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
export default Client;
