"use client"

import Image from "next/image";
import errorImg from "../../../public/error.png"

const ErrorPage = ({ error }: { error: Error }) => {
 
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
          <div>
            <Image
              src={errorImg}
              alt="error"
              className="my-5 mx-auto"
            ></Image>
            <h2 className="mx-5">{error.message}</h2>
          </div>
      </div>
  )
}
export default ErrorPage;
