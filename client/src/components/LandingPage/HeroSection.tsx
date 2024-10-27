import React from "react";
import Button from "./Button";
import Steps from "./Steps";
import { steps_data } from "@/index";
import Heading_and_Sunheading from "./Heading_and_Subheading";
import Image_Container from "./Image_Container";
import Image_Container2 from "./Image_Container2";

function HeroSection() {
  return (
    <main className="overflow-hidden  pt-10 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Heading_and_Sunheading
          beforeBrHeading={"transform your imagination with"}
          spanHeading={"AI-powered"}
          afterBrheading={"avatars that speak"}
          beforeBrdesc={
            "Avatarify is an AI-driven solution that generates speaking avatars, transforming your "
          }
          afterBrdesc={"messages into engaging digital expressions."}
        />

        <Button children={"Get Started"} className="mt-8" />
      </div>

      <Image_Container />

      <div className="flex flex-col items-center">
        <Heading_and_Sunheading
          beforeBrHeading={" Create your Avatar Instantly"}
          beforeBrdesc={
            "Instant avatar creation has never been easier then with Avatarify"
          }
          className={"mt-10"}
        />
        <div className="lg:w-[85%] w-full md:w-full px-5  mt-12 md:flex-col flex-col lg:flex lg:flex-row lg:justify-between items-center h-fit ">
          {steps_data.map((items, ind) => (
            <Steps
              key={ind}
              index={ind + 1}
              heading={items.heading}
              desc={items.desc}
            />
          ))}
        </div>
      </div>
      <Image_Container2/>
    </main>
  );
}

export default HeroSection;
