"use client";
import MaxWidth from "../MaxWidth";
import { DatePickerDemo } from "../DatePicker";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios"

function HeroSection() {
  const { user, isSignedIn } = useUser();
  const isAuthenticated = !!user
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [dob, setDob] = useState<Date>(new Date());
  const [anniversary, setAnniversary] = useState<Date>(new Date());

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };
  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    console.log(country);
    console.log(city);
    console.log(address);
    console.log(dob);
    console.log(anniversary);
    setCountry("");
    setCity("");
    setState("");
    setAddress("");
    setDob(new Date());
    setAnniversary(new Date());
  };

  useEffect(() => {
    if (isAuthenticated) {
    
  }
  }, [isSignedIn,user])

  return (
    <MaxWidth>
      <h1 className="font-ala text-3xl lg:text-5xl capitalize font-bold mt-5">
        My profile
      </h1>
      <form onSubmit={handleSubmit} className="w-[98%] mt-5 mx-auto rounded-md">
        <div className="first_row w-full   px-2 flex lg:px-10 gap-7 items-center">
          <div className="left h-full">
            <div className="circle w-20 lg:w-28 h-20 lg:h-28 bg-yellow-300 rounded-full"></div>
          </div>
          <div className="right w-2/3 h-full flex flex-col py-5">
            <div className="upper flex items-center gap-2">
              <h1 className="font-ala text-2xl font-bold md:text-5xl lg:text-5xl capitalize">
                Parth
              </h1>
              <h1 className="font-ala text-2xl font-bold md:text-5xl lg:text-5xl capitalize">
                Rajput
              </h1>
            </div>
            <div className="lower">
              <h1 className="font-ala text-sm font-bold md:text-5xl lg:text-lg text-zinc-500 lowercase">
                parthbrajput30@gmail.com
              </h1>
            </div>
          </div>
        </div>

        <div className="second_row flex flex-col gap-2  lg:gap-5 mt-10 items-center w-full px-0 lg:px-10">
          <div className="upper_part w-full px-2 lg:px-10 flex items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">First Name </span>: Parth
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Last Name </span>: Rajput
            </h1>
          </div>
          <div className="lower_part w-full  px-2 lg:px-10 flex items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class"> Phone Number</span>: 1234567890
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Clerk Id</span>: jhgidijwefnoifiorefhi
            </h1>
          </div>
          <div className="lower_part w-full  px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl flex items-center gap-2 font-medium capitalize">
              <span className="font_bold_class"> Country</span>:
              <input
                onChange={handleCountryChange}
                type="text"
                className="w-56 h-8 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
              />
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl flex items-center gap-2 font-medium capitalize">
              <span className="font_bold_class"> State</span>:
              <input
                onChange={handleStateChange}
                type="text"
                className="w-56 h-8 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
              />
            </h1>
          </div>
          <div className="lower_part w-full  px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl flex items-center gap-2 font-medium capitalize">
              <span className="font_bold_class"> Address</span>:
              <textarea
                onChange={handleAddressChange}
                className="w-56 h-20 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
              ></textarea>
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class"> City</span>:
              <input
                onChange={handleCityChange}
                type="text"
                className="w-56 h-8 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
              />
            </h1>
          </div>
          <div className="lower_part w-full  px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl flex items-center gap-2 font-medium capitalize">
              <span className="font_bold_class"> Date of Birth</span>:
              <DatePickerDemo dob={dob} setDob={setDob} />
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl flex items-center gap-2 font-medium capitalize">
              <span className="font_bold_class"> Date of Anniversary</span>:
              <DatePickerDemo
                
                anniversary={anniversary}
                setAnniversary={setAnniversary}
              />
            </h1>
          </div>
        </div>

        <div className="submit w-full h-14 flex items-center justify-center mt-3 lg:mt-10">
          <button
            type="submit" 
            className="lg:px-3 w-fit px-1 py-2 font-semibold cursor-pointer rounded-md bg-[#2664EF] gap-3 capitalize text-xl md:text-2xl lg:text-3xl font-ala text-white flex items-center"
          >
            Update Profile
          </button>
        </div>
      </form>
    </MaxWidth>
  );
}

export default HeroSection;
