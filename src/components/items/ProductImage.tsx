import Image from "next/image"
import noImage from "../../public/no_image.png"

const ProductImage = (props : { 
    "imageUrl": string 
    "alt": string
} ) => {
    return (
        <>
            <Image
                src={props.imageUrl ? props.imageUrl : noImage}
                alt={props.alt}
                className="block object-cover h-auto rounded-md aspect-square my-5"
                width="300"
                height="300"
            />
        </>
    )
}
export default ProductImage;
