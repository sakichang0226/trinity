import { SfIconChevronRight } from '@storefront-ui/react';

const BreadCrumb = ({ text = "" , isNext = true } : { text: string , isNext? : boolean }) => {
    return (
        <>
            <span className=""> { text } </span>
            { isNext && <SfIconChevronRight size="sm" className="mx-0.5 text-disabled-500" />}
        </>
    )
}
export default BreadCrumb;
