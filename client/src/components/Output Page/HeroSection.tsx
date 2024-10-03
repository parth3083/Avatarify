import React from "react";
import MaxWidth from "../MaxWidth";
import Link from "next/link";
import Image from "next/image";
import image1 from "@/app/assets/avatar.jpeg";

function HeroSection() {
  return (
    <MaxWidth className="flex flex-col items-center gap-7 md:gap-10 lg:gap-7">
      <h1 className="font-ala text-4xl font-bold md:text-6xl lg:text-6 xl capitalize text-center w-full pt-5">
        Your Avatar
      </h1>

      <div className="lg:w-80 w-56 md:w-96 md:h-96 lg:h-80 h-56 rounded-full bg-green-500 overflow-hidden">
        <Image
          src={image1}
          alt="avatar"
          className="w-full h-full object-cover"
          width={225}
          height={225}
        />
      </div>
      <p className="lg:text-xl text-sm md:text-lg font-ala w-[90%] font-medium lg:w-[60%] text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        omnis explicabo quod, at nihil unde neque dignissimos natus facilis iste
        adipisci ex molestiae veritatis maxime doloremque numquam. Pariatur,
        tempore obcaecati?
      </p>

      <Link
        href={"/"}
        className="px-2 py-2 bg-[#2664EF] rounded-md text-3xl font-ala font-medium text-white cursor-pointer"
      >
        Generate More
      </Link>
    </MaxWidth>
  );
}

export default HeroSection;
