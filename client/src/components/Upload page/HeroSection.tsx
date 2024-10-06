"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { SlCloudUpload } from "react-icons/sl";
import { DatePickerDemo } from "@/components/DatePicker";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios from "axios";

function HeroSection() {
  const { user } = useUser();
  const isAuthticated = !!user;

  if (!isAuthticated) {
    redirect("/");
  }

  const [time, setTime] = useState(12);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const email = user.emailAddresses[0]?.emailAddress || "";

  const handleTimeChange = (e: number[]) => {
    setTime(e[0]);
  };

  const handleFileInput = (inputId: string) => {
    document.getElementById(inputId)?.click();
  };
  const handleFile = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleInputMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  async function avatar() {
    try {
      const response = await axios.post(
        "http://localhost:8000/details/getdetails",
        {
          email,
          message,
          time,
          selectedDate,
          file,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGenerateAvatar = () => {
    try {
      avatar();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center md:gap-14 md:mt-16 lg:mt-0 mt-0 gap-8 lg:gap-8 ">
      <div className="upload-div w-full   flex items-center justify-center flex-col">
        <div
          onClick={() => handleFileInput("inputImage")}
          className="square md:w-36 md:h-36 lg:w-32 w-24 lg:h-32 h-24 rounded-md bg-[#2664EF] flex items-center justify-center"
        >
          <input type="file" hidden id="inputImage" onChange={handleFile} />
          <SlCloudUpload className="lg:text-8xl md:text-8xl text-6xl text-white cursor-pointer" />
        </div>
        <h1 className="font-ala text-3xl lg:text-5xl md:text-5xl capitalize font-bold mt-5">
          Upload your image
        </h1>
        <p className="font-ala font-medium capitalize text-sm md:text-2xl  lg:text-lg text-center tracking-wide text-zinc-500">
          upload clear image
        </p>
      </div>

      <div className="message-div w-full   flex items-start flex-col gap-3 justify-start">
        <h1 className="font-ala text-4xl font-bold md:text-5xl lg:text-5xl capitalize">
          enter your message
        </h1>
        <input
          type="text"
          className="lg:w-[75%] w-[95%] h-12 outline-none mx-auto border-2 border-zinc-500 pl-3 font-ala  text-xl rounded-md "
          onChange={handleInputMessage}
        />
      </div>

      <div className="date-selection w-full  flex items-center gap-4 lg:gap-10">
        <h1 className="font-ala text-3xl font-bold md:text-5xl lg:text-5xl capitalize">
          select date :
        </h1>
        <DatePickerDemo
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="time-selection w-full  flex flex-col items-center ">
        <div className="w-full flex items-center gap-7">
          <h1 className="font-ala text-3xl font-bold md:text-5xl lg:text-5xl capitalize">
            select time :
          </h1>
          <h1 className="font-ala text-3xl font-bold md:text-5xl lg:text-5xl capitalize">
            {time > 11 ? ` ${time}:00 PM ` : `${time}:00 AM`}{" "}
          </h1>
        </div>

        <Slider
          defaultValue={[12]}
          min={0}
          max={23}
          step={1}
          className="w-[95%] mt-3"
          onValueChange={handleTimeChange}
        />
      </div>

      <button
        onClick={() => handleGenerateAvatar()}
        
        className="px-2 py-2 font-ala text-4xl rounded-md text-white font-medium bg-[#2664EF] "
      >
        Generate Avatar
      </button>
    </div>
  );
}

export default HeroSection;
