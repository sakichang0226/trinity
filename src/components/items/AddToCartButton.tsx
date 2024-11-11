import { SfButton } from "@storefront-ui/react"

export const AddToCartButton = (props : {
    isEnabled? : boolean
}) => {
    return <><SfButton disabled={props.isEnabled}>{ props.isEnabled ? "SOLD OUT" : "ADD TO CART" }</SfButton></>
}