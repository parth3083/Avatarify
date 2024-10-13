"use client";
import MaxWidth from "../MaxWidth";
import { DatePickerDemo } from "../DatePicker";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function HeroSection() {
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    clerkId: "",
    email: "",
    imageUrl: "",
    userName: "",
    country: "",
    dateOfBirth: "",
    dateOfAnniversary: "",
    address: "",
    state: "",
    city: "",
  });

  const [dob, setDob] = useState<Date>(new Date());
  const [anniversary, setAnniversary] = useState<Date>(new Date());
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false); // State to handle editing mode

  async function fetchUserDetails() {
    try {
      if (!email) {
        redirect("/");
      }

      // Fetch user details from backend
      const response = await axios.get("http://localhost:8000/fetch-details", {
        params: { email },
      });

      const details = response.data.data;

      // Set the fetched data in the state
      setUserDetails({
        firstName: details.firstName || "",
        lastName: details.lastName || "",
        phoneNumber: details.phoneNumber || "",
        clerkId: details.clerkId || "",
        email: details.email || "",
        imageUrl: details.imageUrl || "",
        userName: details.username || "",
        country: details.country || "",
        dateOfBirth: details.dateOfBirth || "",
        dateOfAnniversary: details.dateOfAnniversary || "",
        address: details.address || "",
        state: details.state || "",
        city: details.city || "",
      });

      // Populate local state with user details if available
      if (details.country) setCountry(details.country);
      if (details.state) setState(details.state);
      if (details.city) setCity(details.city);
      if (details.address) setAddress(details.address);
      if (details.dateOfBirth) setDob(new Date(details.dateOfBirth));
      if (details.dateOfAnniversary) setAnniversary(new Date(details.dateOfAnniversary));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
  useEffect(() => {

    fetchUserDetails();
  }, [email, isSignedIn, user]);

  async function updateUserDetails() {
    try {
      const response = await axios.post("http://localhost:8000/update-details", {
        email, state, city, address, country, dob, anniversary,
      });
      if (response.status === 200) {
        toast({
          description: "User data updated successfully",
        });
        setIsEditing(false);
        fetchUserDetails();// Exit editing mode after successful update
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      updateUserDetails();
    } else {
      // Logic for submitting to the next page
      redirect("/next-page"); // Change this to your actual redirection logic
    }
  };

  // Function to format the date as '24 October 2000'
  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <MaxWidth>
      <h1 className="font-ala text-3xl lg:text-5xl text-[#2664EF] capitalize font-bold mt-5">My Profile</h1>
      <form onSubmit={handleSubmit} className="w-[98%] mt-5 mx-auto rounded-md">
        <div className="first_row w-full px-2 flex lg:px-10 gap-7 items-center">
          <div className="left h-full">
            <div className="circle w-20 lg:w-28 h-20 lg:h-28 bg-yellow-300 rounded-full">
              {userDetails.imageUrl && (
                <img
                  src={userDetails.imageUrl}
                  alt={`${userDetails.firstName}'s Profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
          </div>
          <div className="right w-2/3 h-full flex flex-col py-5">
            <div className="upper flex items-center gap-2">
              <h1 className="font-ala text-2xl font-bold md:text-5xl lg:text-5xl capitalize">
                {userDetails.userName || "First Name"}
              </h1>
            </div>
            <div className="lower">
              <h1 className="font-ala text-sm font-bold md:text-5xl lg:text-lg text-zinc-500 lowercase">
                {userDetails.email || "Email"}
              </h1>
            </div>
          </div>
        </div>

        <div className="second_row flex flex-col gap-2 lg:gap-5 mt-10 items-center w-full px-0 lg:px-10">
          <div className="upper_part w-full px-2 lg:px-10 flex items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">First Name</span> : {userDetails.firstName}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Last Name</span> : {userDetails.lastName}
            </h1>
          </div>

          <div className="lower_part w-full px-2 lg:px-10 flex items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Phone Number</span> : {userDetails.phoneNumber}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Clerk Id</span>: {userDetails.clerkId}
            </h1>
          </div>

          {/* Conditionally Render Country, State, City, Address */}
          <div className="lower_part w-full px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Country</span> : {" "} 
              {isEditing ? (
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  type="text"
                  className="w-56 h-8 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
                />
              ) : (
                userDetails.country || "N/A"
              )}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">State</span> : {" "} 
              {isEditing ? (
                <input
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  type="text"
                  className="w-56 h-8 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
                />
              ) : (
                userDetails.state || "N/A"
              )}
            </h1>
          </div>

          {/* Conditionally Render Address and City */}
          <div className="lower_part w-full px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Address</span> : {" "} 
              {isEditing ? (
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className="w-56 h-20 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
                />
              ) : (
                userDetails.address || "N/A"
              )}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">City</span> : {" "} 
              {isEditing ? (
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  type="text"
                  className="w-56 h-8 outline-none border-2 border-slate-500 pl-2 rounded-md font-ala font-medium text-xl"
                />
              ) : (
                userDetails.city || "N/A"
              )}
            </h1>
          </div>

          {/* Conditionally Render Date of Birth and Date of Anniversary */}
          <div className="lower_part w-full px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Date of Birth</span> : {" "} 
              {isEditing ? (
                <DatePickerDemo date={dob} setDate={setDob} />
              ) : (
                formatFullDate(userDetails.dateOfBirth) || "N/A"
              )}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Date of Anniversary</span> : {" "}  
              {isEditing ? (
                <DatePickerDemo date={anniversary} setDate={setAnniversary} />
              ) : (
                formatFullDate(userDetails.dateOfAnniversary) || "N/A"
              )}
            </h1>
          </div>
        </div>

        <div className="buttons mt-5 flex gap-3 justify-end">
          <button 
            type="button" 
            className={`border-2 border-black hover:bg-black hover:text-white transition-all ease-in-out duration-300 text-black  font-medium font-ala py-2 px-5 rounded-md ${isEditing ? "hidden" : "block"}`} 
            onClick={() => setIsEditing(true)}
          >
            Update 
          </button>
          <button type="submit" className="border-2 border-black hover:bg-black hover:text-white transition-all ease-in-out duration-300 text-black  font-medium font-ala py-2 px-5 rounded-md">
            Proceed
          </button>
        </div>
      </form>
    </MaxWidth>
  );
}

export default HeroSection;
