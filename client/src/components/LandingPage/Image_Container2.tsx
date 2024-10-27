import Image from 'next/image'
import React from 'react'
import image1 from "@/app/assets/upload.png"

function Image_Container2() {
  return (
    <div
    className={`w-[80vw] md:w-[65vw]  lg:w-[50vw]   p-5 mb-10 rounded-md bg-white shadow-lg shadow-slate-400 mt-10 image_conatiner `}
  >
    <div className="w-full  rounded-md ">
      <Image
        src={image1}
        width={1899}
        height={872}
        alt="image"
        className="w-full h-full object-contain"
      />
    </div>
  </div>
  )
}

export default Image_Container2