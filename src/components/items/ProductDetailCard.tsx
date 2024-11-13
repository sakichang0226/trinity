"use client"
import Item from "@/src/types/Item"
import { ProductImage, ProductName, Price, Description, AddToCartButton } from "@/src/components/items/index"
import { QuantitySelector } from "../common"
import { useState } from "react"
import { MIN_STOCK } from "@/src/const/ProductValues"

export const ProductDetailCard = (props: { itemInfo : Item }) => {
    const itemInfo = props.itemInfo;
    const [value, setValue] = useState<number>(0);

    return (
        <>
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
                    <div>
                        <ProductName itemName={itemInfo.name}></ProductName>
                        <div className="my-5">
                            <Price value={itemInfo.price}></Price>
                        </div>
                        <div className="flex md:flex-wrap gap-5">
                            <QuantitySelector
                                max={itemInfo.stock}
                                value={value}
                                min={MIN_STOCK}
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
        </>
    )
}
