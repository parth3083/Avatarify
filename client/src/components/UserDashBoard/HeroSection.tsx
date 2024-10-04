import Link from "next/link";
import MaxWidth from "../MaxWidth";
import CardContainer from "./CardContainer";

function HeroSection() {
  return (
    <MaxWidth>
      <div className="w-full  h-20 flex items-center justify-between">
        <div>
          {" "}
          <h1 className="font-ala text-3xl lg:text-5xl capitalize font-bold mt-5">
            my avatars
          </h1>
        </div>
        <Link
          href={"/upload"}
          className="px-2 py-2  rounded-md text-ala  text-white text-md lg:text-3xl font-medium cursor-pointer bg-[#2664EF]"
        >
          Genearte Avatar
        </Link>
      </div>

      <CardContainer />
    </MaxWidth>
  );
}

export default HeroSection;
