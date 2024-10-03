import React from "react";
import MaxWidth from "../MaxWidth";
import CardContainer from "./CardContainer";

function HeroSection() {
  return (
    <MaxWidth>
      <h1 className="font-ala text-3xl lg:text-5xl capitalize font-bold mt-5">
        my avatars
      </h1>

      <CardContainer />
    </MaxWidth>
  );
}

export default HeroSection;
