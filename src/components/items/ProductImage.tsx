import Image from "next/image"

const ProductImage = (props : { 
    "imageUrl": string 
    "alt": string
} ) => {
    return (
        <>
            <img
                src={props.imageUrl}
                alt={props.alt}
                className="block object-cover h-auto rounded-md aspect-square"
                width="300"
                height="300"
            />
        </>
    )
}
export default ProductImage;