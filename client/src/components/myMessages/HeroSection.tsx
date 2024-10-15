"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { DatePickerDemo } from "../DatePicker";
import { Slider } from "@/components/ui/slider";
import { DropdownMenuRadioGroupDemo } from "../ui/DropDownList";

// Define the Message type
interface Message {
  message: string;
  date: string;
  time: number; // Changed to a number for proper slider handling (24-hour format)
  recurrence: string;
}

function HeroSection() {
  // Initialize messages state with one default message component
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "",
      date: new Date().toLocaleDateString(), // Default to current date
      time: new Date().getHours(), // Default to current hour (in 24-hour format)
      recurrence: "once", // Default to "once"
    },
  ]);

  // Function to add a new message component
  const handleAddMessage = () => {
    const newMessage: Message = {
      message: "",
      date: new Date().toLocaleDateString(), // Default to current date
      time: new Date().getHours(), // Default to current hour (24-hour format)
      recurrence: "once", // Default to "once"
    };
    setMessages([...messages, newMessage]); // Add the new message to the array
  };

  // Function to handle changes to individual message fields
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

  // Function to render individual message components
  const renderMessageComponent = (message: Message, index: number) => {
    return (
      <div
        key={index}
        className="message_card border-2 border-[#2664EF] px-4 py-2 rounded-lg shadow-md mb-4"
      >
        <h1 className="font-ala text-2xl mb-2">Message {index + 1}</h1>

        {/* Message Input */}
        <input
          type="text"
          placeholder="Enter your message"
          value={message.message}
          onChange={(e) =>
            handleMessageChange(index, "message", e.target.value)
          }
          className="outline-2 p-2 font-ala mb-3 text-lg font-normal w-full rounded-md"
        />

        {/* Date Picker */}
        <div className="w-full flex mb-3 items-center gap-10">
          <h1 className="font-ala text-2xl">Select Date:</h1>
          <DatePickerDemo
            selectedDate={message.date}
            onDateChange={(date) =>
              handleMessageChange(index, "date", date.toLocaleDateString())
            }
          />
        </div>

        {/* Time Slider */}
        <div className="w-full mb-5">
          <h1 className="font-ala text-2xl">Select Time: {message.time}:00</h1>
          <Slider
            min={0}
            max={23}
            step={1}
            value={[message.time]} // Pass the time as an array
            onValueChange={
              (timeArray) => handleMessageChange(index, "time", timeArray[0]) // Get the first element of the array
            }
            className="mt-2"
          />
        </div>

        {/* Recurrence Dropdown */}
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

  const handleGenerateClick = () => {
    console.log("Messages:", messages);
  };

  return (
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
  );
}

export default HeroSection;