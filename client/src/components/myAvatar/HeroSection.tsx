"use client";
import React, { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { avatarOptions } from "@/index";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import OutputLoader from "../OutputLoader";

function HeroSection() {
  const { toast } = useToast();
  const { user } = useUser();
  const isAuthenticated = !!user;
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  if (!isAuthenticated) {
    redirect("/");
  }

  const [file, setUploadedImage] = useState<File | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleAvatarSelect = (avatar: any) => {
    setSelectedAvatar(avatar);
  };

  async function uploadImage() {
    setIsLoading(true)
    const avatarID = selectedAvatar.id;


    const formData = new FormData(); // Create a FormData object
    formData.append("file", file as Blob); // Append the file
    formData.append("email", email);
    formData.append("avatarID", avatarID);

    try {
      const response = await axios.post(
        "http://localhost:8000/image-details/upload",
        formData, // Send the FormData
        { headers: { "Content-Type": "multipart/form-data" } } // Set the header for multipart
      );

      if (response.status === 200) {
        toast({
          description: "Image uploaded successfully",
          type: "foreground",
        });
        setSelectedAvatar(null);
        setUploadedImage(null);
        setPreviewImageUrl(null);
        setIsLoading(false)
        router.push('/output')// Clear the preview image URL if necessary
      }
    } catch (error) {
      console.error(error); // Log any error for debugging
      toast({
        description: "Upload failed. Please try again.",
      });
    }
  }

  const handleUpload = () => {
    if (!selectedAvatar || !file) {
      toast({
        description: "Please select an avatar or upload an image.",
      });
      return; // Ensure to return early if validation fails
    }

    uploadImage();
  };

  return (
    <>
      {isLoading ? (<>
      <OutputLoader/>
      </>) : (<>
        <div className="w-full flex flex-col items-center md:gap-14 lg:mt-0 mt-0 gap-8 lg:gap-8 ">
      <h1 className="font-ala text-3xl text-left w-full lg:text-5xl text-[#2664EF] capitalize font-bold ">
        My Avatar
      </h1>
      <div className="upload-div w-full flex items-center justify-center flex-col">
        <div className="square md:w-24 md:h-24 lg:w-16 w-16 lg:h-16 h-16 rounded-md bg-[#2664EF] flex items-center justify-center">
          <input
            type="file"
            id="inputImage"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />
          <label htmlFor="inputImage">
            <SlCloudUpload className="lg:text-4xl md:text-6xl text-4xl text-white cursor-pointer" />
          </label>
        </div>
        <h1 className="font-ala text-2xl lg:text-3xl md:text-3xl capitalize font-bold mt-3">
          Upload your image
        </h1>
        <p className="font-ala font-medium capitalize text-sm md:text-2xl lg:text-lg text-center tracking-wide text-zinc-500">
          upload clear image
        </p>
      </div>

      <div className="selection w-full">
        <h1 className="font-ala text-3xl text-left w-full lg:text-4xl text-black capitalize font-bold ">
          Select Avatar
        </h1>
        <div className="card-container lg:flex-row flex-col gap-10 lg:gap-0 flex px-20 w-full items-center justify-evenly">
          {avatarOptions.map((avatar) => (
            <div
              key={avatar.id}
              className="cursor-pointer w-72 h-72 flex flex-col items-center mt-10"
              onClick={() => handleAvatarSelect(avatar)}
            >
              <div className="video-container w-full h-[88%] overflow-hidden bg-blue-500">
                <video
                  src={avatar.videoUrl}
                  className="w-full h-full object-cover"
                  width={150}
                  height={150}
                  onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                ></video>
              </div>
              <div className="lower flex flex-col items-start justify-start px-2 w-full h-[12%]">
                <h1 className="font-ala font-medium text-xl">{avatar.title}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="preview w-full mb-5 mt-5">
        <h1 className="font-ala text-3xl text-left w-full lg:text-4xl text-black capitalize font-bold">
          Preview
        </h1>
        <div className="w-full h-[145vw] lg:h-80 px-16 lg:flex-row flex-col gap-10 lg:gap-0 flex items-center justify-between mt-5">
          <div className="left flex flex-col items-center w-full lg:w-[45%] h-full mb-3">
            <div className="upper w-full flex items-center justify-center h-[12%]">
              <h1 className="font-ala font-medium text-2xl">Uploaded Image</h1>
            </div>
            <div className="lower w-full h-[88%]  overflow-hidden">
              {previewImageUrl ? (
                <img
                  src={previewImageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
          </div>

          <div className="right flex flex-col items-center w-full lg:w-[45%] h-full mb-3">
            <div className="upper w-full flex items-center justify-center h-[12%]">
              <h1 className="font-ala font-medium text-2xl">Selected Avatar</h1>
            </div>
            <div className="lower w-full h-[88%]  overflow-hidden">
              {selectedAvatar ? (
                <video
                  src={selectedAvatar.videoUrl}
                  className="w-full h-full object-contain"
                  onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                ></video>
              ) : (
                <p>No avatar selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-16 mb-10 flex items-center justify-center">
        <button
          onClick={handleUpload}
          className="p-2 rounded-md text-[#2664EF] border-2 border-[#2664EF] hover:bg-[#2664EF] hover:text-white transition-all ease-in-out duration-300 text-2xl font-ala font-medium"
        >
          Upload Image
        </button>
      </div>
    </div></>)}
    </>
  );
}

export default HeroSection;
