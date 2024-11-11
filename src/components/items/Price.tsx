const Price = (props : { value : number }) => {
    return (
        <>
            <h3 className="typography-headline-3">{ props.value?.toLocaleString()}</h3>
        </>
    )
}
export default Price;