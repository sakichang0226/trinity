import Link from "next/link";
import Image from "next/image";
import nextsvg from "@/src/public/next.svg";

const Logo = () => {
    return (
        <>
            <Link 
                href={"/"}
                className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
            >
                <Image 
                    src = { nextsvg }
                    width = {175}
                    height = {176}
                    alt= {"Sf Logo"}
                    className="w-[175px] md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
                />
            </Link>
        </>
    )
}
export default Logo;
