import MaxWidth from "@/components/MaxWidth";
import React from "react";
import { SlCloudUpload } from "react-icons/sl";

function page() {
  return (
    <MaxWidth>
      <div className="w-full flex flex-col items-center gap-5 bg-green-500">
        <div className="upload-div w-full   flex items-center justify-center flex-col">
          <div className="square w-32 h-32 rounded-md bg-[#2664EF] flex items-center justify-center">
            <SlCloudUpload className="text-8xl text-white cursor-pointer" />
          </div>
          <h1 className="font-ala text-3xl lg:text-5xl capitalize font-bold mt-5">
            Upload your image
          </h1>
          <p className="font-ala font-medium capitalize text-sm md:text-lg lg:text-lg text-center tracking-wide text-zinc-500">
            upload clear image
          </p>
              </div>
              <div className="message-div w-full   flex items-start flex-col gap-3 justify-start">
                  <h1 className="font-ala text-4xl font-bold md:text-3xl lg:text-5xl capitalize">
                      enter your message
                  </h1>
                  <input type="text" className="w-[75%] h-12 outline-none mx-auto border-2 border-zinc-500 pl-3 fnt-ala text-xl rounded-md " />
              </div>
      </div>
    </MaxWidth>
  );
}

export default page;
