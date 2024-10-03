import React from "react";
import Card from "./Card";

function CardContainer() {
  return (
    <div className="card-container w-full  lg:flex-row flex-col md:flex-col  mb-10 mt-10 flex lg:gap-14 gap-7 px-16 items-center lg:flex-wrap">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardContainer;
