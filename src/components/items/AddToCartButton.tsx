import { SfButton } from "@storefront-ui/react"

export const AddToCartButton = (props : {
    isEnabled? : boolean
}) => {
    return <><SfButton className="rounded-none" disabled={props.isEnabled}>{ props.isEnabled ? "SOLD OUT" : "ADD TO CART" }</SfButton></>
}
