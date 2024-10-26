import Image from 'next/image'
import React from 'react'
import image1 from "@/app/assets/output.gif"

function OutputLoader() {
  return (
    <div className="w-full z-50 h-screen fixed top-0 left-0 right-0 bottom-0 inset-0 flex items-center justify-center bg-white bg-opacity-50 ">

    <div className="container  relative w-[90%] h-[60%] lg:w-[33vw] flex flex-col items-center justify-center p-8 lg:h-[20vw]  font-ala text-5xl font-semibold">
        <div className="upper w-full h-[80%]  overflow-hidden">
          <Image
            src={image1}
            alt="Loading..."
            width={200}
            height={200}
            className='w-full h-full object-contain'
          />
        </div>
        <div className="lower w-full h-[20%]  flex text-2xl items-center justify-center">
        Working on the image....
        </div>
    </div>
  </div>
  )
}

export default OutputLoader