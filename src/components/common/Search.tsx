import { SfInput, SfButton, SfIconSearch } from "@storefront-ui/react"

const Search = () => {

    return (
        <>
            <form
                role="search"
                className="hidden md:flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
            >
            <SfInput
                type="search"
                className="[&::-webkit-search-cancel-button]:appearance-none"
                placeholder="Search"
                wrapperClassName="flex-1 h-10 pr-0"
                size="base"
                slotSuffix={
                <span className="flex items-center">
                    <SfButton
                    variant="tertiary"
                    square
                    aria-label="search"
                    type="submit"
                    className="rounded-l-none hover:bg-transparent active:bg-transparent"
                    >
                    <SfIconSearch />
                    </SfButton>
                </span>
                }
            />
        </form>
        </>
    )
}
export default Search;
