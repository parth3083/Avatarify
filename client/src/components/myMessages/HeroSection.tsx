"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { DatePickerDemo } from "../DatePicker";
import { Slider } from "@/components/ui/slider";
import { DropdownMenuRadioGroupDemo } from "../ui/DropDownList";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import MessageLoader from "../MessageLoader";
import { useRouter } from "next/navigation";

interface Message {
  message: string;
  date: string;
  time: number;
  recurrence: string;
}

function HeroSection() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "",
      date: new Date().toLocaleDateString(),
      time: new Date().getHours(),
      recurrence: "once",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMessage = () => {
    const newMessage: Message = {
      message: "",
      date: new Date().toLocaleDateString(),
      time: new Date().getHours(),
      recurrence: "once",
    };
    setMessages([...messages, newMessage]);
  };

  const handleMessageChange = (
    index: number,
    field: keyof Message,
    value: string | number
  ) => {
    const updatedMessages = messages.map((msg, i) =>
      i === index ? { ...msg, [field]: value } : msg
    );
    setMessages(updatedMessages);
  };

  const renderMessageComponent = (message: Message, index: number) => {
    return (
      <div
        key={index}
        className="message_card border-2 border-[#2664EF] px-4 py-2 rounded-lg shadow-md mb-4"
      >
        <h1 className="font-ala text-2xl mb-2">Message {index + 1}</h1>
        <input
          type="text"
          placeholder="Enter your message"
          value={message.message}
          onChange={(e) =>
            handleMessageChange(index, "message", e.target.value)
          }
          className="outline-2 p-2 font-ala mb-3 text-lg font-normal w-full rounded-md"
        />
        <div className="w-full flex mb-3 items-center gap-10">
          <h1 className="font-ala text-2xl">Select Date:</h1>
          <DatePickerDemo
            selectedDate={message.date}
            onDateChange={(date) =>
              handleMessageChange(index, "date", date.toLocaleDateString())
            }
          />
        </div>
        <div className="w-full mb-5">
          <h1 className="font-ala text-2xl">Select Time: {message.time}:00</h1>
          <Slider
            min={0}
            max={23}
            step={1}
            value={[message.time]}
            onValueChange={(timeArray) =>
              handleMessageChange(index, "time", timeArray[0])
            }
            className="mt-2"
          />
        </div>
        <div className="w-full flex mb-3 items-center gap-10">
          <h1 className="font-ala text-2xl">Repeat:</h1>
          <DropdownMenuRadioGroupDemo
            selected={message.recurrence}
            onChange={(value) =>
              handleMessageChange(index, "recurrence", value)
            }
          />
        </div>
      </div>
    );
  };

  async function messageUpload() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/upload-message",
        { messages, email }
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast({
          description: "Messages uploaded successfully",
        });
        setMessages([]);
        router.push("/my-avatar");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleGenerateClick = () => {
    console.log("Messages:", messages);
    messageUpload();
  };

  return (
    <>
      {isLoading ? (
        <MessageLoader />
      ) : (
        <>
          <div className="w-full h-28 flex items-center justify-between">
            <h1 className="font-ala text-3xl text-left w-fit lg:text-5xl text-[#2664EF] capitalize font-bold">
              My Messages
            </h1>
            <button
              onClick={handleAddMessage}
              className="p-2 font-ala text-lg flex items-center gap-2 hover:text-white hover:bg-[#2664EF] border-2 transition-all ease-in-out duration-300 text-[#2664EF] rounded-md font-medium border-[#2664EF]"
            >
              <IoMdAdd />
              New Message
            </button>
          </div>

          <div className="message_container mt-6 w-full">
            {messages.map((message, index) =>
              renderMessageComponent(message, index)
            )}
          </div>

          <div className="w-full mt-2 mb-3 h-14 flex items-center justify-center">
            <button
              onClick={handleGenerateClick}
              className="p-2 font-ala text-2xl flex items-center gap-2 hover:text-white hover:bg-[#2664EF] border-2 transition-all ease-in-out duration-300 text-[#2664EF] rounded-md font-medium border-[#2664EF]"
            >
              Generate
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default HeroSection;
