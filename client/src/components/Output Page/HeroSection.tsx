"use client";
import React, { useEffect, useState } from "react";
import MaxWidth from "../MaxWidth";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function HeroSection() {
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const [avatarDetails, setAvatarDetails] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  async function fetchDetails() {
    if (!email) return;
    try {
      const response = await axios.get("http://localhost:8000/fetch", {
        params: { email },
      });
      console.log(response.data);
      setAvatarDetails(response.data);
    } catch (error) {
      console.error("Error fetching avatar details:", error);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchDetails();
    }
  }, [isSignedIn, email]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (avatarDetails?.message) {
      const messageTime = avatarDetails.message.time;

      if (currentHour === messageTime) {
        setIsVideoPlaying(true);
      } else {
        setIsVideoPlaying(false);
      }
    }
  }, [currentHour, currentMinute, avatarDetails]);

  return (
    <MaxWidth className="flex flex-col items-center gap-7 md:gap-10 lg:gap-7">
      <h1 className="font-ala text-4xl font-bold md:text-6xl lg:text-6xl capitalize text-center w-full pt-5">
        Your Avatar
      </h1>

      <div className="lg:w-96 w-56 md:w-96 md:h-96  lg:h-80 h-56  rounded-lg flex items-center justify-center  overflow-hidden">
        {avatarDetails?.message && avatarDetails.videoUrl && (
          <div className="w-full h-full">
            <video
              className="w-full h-full object-contain "
              autoPlay={isVideoPlaying}
            >
              <source src={avatarDetails.videoUrl} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      <p className="lg:text-xl text-sm md:text-lg font-ala w-[90%] font-medium lg:w-[60%] text-center">
        {avatarDetails?.message ? (
          <span>{` ${avatarDetails.message.message}`}</span>
        ) : (
          "No messages available for today."
        )}
      </p>

      <Link
        href={"/my-message"}
        className="px-2 py-2 bg-[#2664EF] rounded-md text-3xl font-ala font-medium text-white cursor-pointer"
      >
        Generate More
      </Link>
    </MaxWidth>
  );
}

export default HeroSection;
