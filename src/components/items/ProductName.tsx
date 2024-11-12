const ProductName = (props : { itemName: string}) => {
    return (
        <>
            <h2 className="typography-headline-2">{props.itemName}</h2>
        </>
    )
} 
export default ProductName;
