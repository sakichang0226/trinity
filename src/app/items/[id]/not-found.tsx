import Image from "next/image";
import errorImg from "../../../public/error.png"

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <div>
          <Image
            src={errorImg}
            alt="error"
            className="my-5"
          ></Image>
          <h2>商品が見つかりませんでした。</h2>
        </div>
    </div>
  )
}
export default NotFound;
