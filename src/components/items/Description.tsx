const Description = (props: {
    title: string,
    message: string
}) => {
    return (
        <>
            <article>
                <h3>{props.title}</h3>
                <hr className="my-1"></hr>
                <p className="break-all">{props.message}</p>
            </article>
        </>
    )
}
export default Description;
