import React from "react";
import image1 from "@/app/assets/avatar.jpeg";
import Image from "next/image";

function Card() {
  return (
    <div className="card flex-shrink-0 w-[90vw] h-36  lg:w-[35vw] flex items-center  lg:h-48 rounded-lg shadow-xl shadow-slate-700 overflow-hidden">
      <div className="left w-1/3 h-full flex items-center justify-center ">
        <div className="image-container w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden">
          <Image
            src={image1}
            alt="avatar"
            className="w-full h-full object-cover"
            width={225}
            height={225}
          />
        </div>
      </div>

      <div className="right w-2/3 h-full  flex items-center justify-center p-2">
        <p className="font-ala font-medium text-sm md:text-lg lg:text-lg text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, sit?
        </p>
      </div>
    </div>
  );
}

export default Card;
