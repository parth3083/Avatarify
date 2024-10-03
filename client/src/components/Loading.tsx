import React from "react";

function Loading() {
  return (
    <div className="w-full relative h-screen  flex-col flex items-center justify-center">
      <h1 className="lg:text-9xl md:text-9xl text-7xl capitalize font-ala font-semibold">
        avatarify
      </h1>
      <p className="font-ala font-medium md:text-4xl text-2xl lg:text-4xl capitalize text-zinc-500">
        an avatar generator
      </p>

      <h1 className="font-ala font-semibold md:text-8xl text-5xl lg:text-8xl absolute bottom-5 left-5 md:left-10 lg:left-10">
        100%
      </h1>
    </div>
  );
}

export default Loading;
