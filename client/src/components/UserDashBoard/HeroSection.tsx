"use client";
import MaxWidth from "../MaxWidth";
import { DatePickerDemo } from "../DatePicker";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function HeroSection() {
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    clerkId: "",
    email: "",
    imageUrl: "",
    userName: "",
    country: "",
    address: "",
    state: "",
    city: "",
  });

  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false); // State to handle editing mode

  async function fetchUserDetails() {
    try {
      if (!email) {
        router.push("/"); // Use router.push for redirection
        return;
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

        address: details.address || "",
        state: details.state || "",
        city: details.city || "",
      });

      // Populate local state with user details if available
      setCountry(details.country || "");
      setState(details.state || "");
      setCity(details.city || "");
      setAddress(details.address || "");
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchUserDetails();
    } else {
      router.push("/"); // Use router.push for redirection if not signed in
    }
  }, [isSignedIn, email]);

  async function updateUserDetails() {
    try {
      const response = await axios.post(
        "http://localhost:8000/update-details",
        {
          email,
          state,
          city,
          address,
          country,
        }
      );

      if (response.status === 200) {
        toast({
          description: "User data updated successfully",
        });
        setIsEditing(false);
        fetchUserDetails();
        router.push("/my-message"); // Use router.push for redirection after successful update
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
      router.push("/my-message"); // Use router.push if not editing
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
      <h1 className="font-ala text-3xl lg:text-5xl text-[#2664EF] capitalize font-bold mt-5">
        My Profile
      </h1>
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
              <span className="font_bold_class">First Name</span> :{" "}
              {userDetails.firstName}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Last Name</span> :{" "}
              {userDetails.lastName}
            </h1>
          </div>

          <div className="lower_part w-full px-2 lg:px-10 flex items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Phone Number</span> :{" "}
              {userDetails.phoneNumber}
            </h1>
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Clerk Id</span>:{" "}
              {userDetails.clerkId}
            </h1>
          </div>

          <div className="lower_part w-full px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Country</span> :{" "}
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
              <span className="font_bold_class">State</span> :{" "}
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

          <div className="lower_part w-full px-2 lg:px-10 lg:flex-row flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between">
            <h1 className="font-ala text-lg lg:text-2xl font-medium capitalize">
              <span className="font_bold_class">Address</span> :{" "}
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
              <span className="font_bold_class">City</span> :{" "}
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
        </div>

        <div className="actions w-full flex items-center gap-10 justify-center  mt-10">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 font-ala text-2xl flex items-center gap-2 hover:text-white hover:bg-[#2664EF] border-2 transition-all ease-in-out duration-300 text-[#2664EF] rounded-md font-medium border-[#2664EF]"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              type="submit"
              className="p-2 font-ala text-2xl flex items-center gap-2 hover:text-white hover:bg-[#2664EF] border-2 transition-all ease-in-out duration-300 text-[#2664EF] rounded-md font-medium border-[#2664EF]"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </MaxWidth>
  );
}

export default HeroSection;
