import Image from "next/image";
import React from "react";
import Button from "../components/Button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div>
        <div className="relative overflow-y-hidden bg-gradient-to-b from-[#F7EEED] to-white overflow-x-hidden min-h-screen flex flex-col items-center justify-center">
          {/* Main Heading Section */}
          <div className="flex flex-col items-center -translate-y-32 text-center">
            <h1 className="text-3xl tracking-tight text-[#131313] font-extralight font-display mb-0">
              Master every interview with
            </h1>
            <h1 className="font-semibold tracking-tighter text-neutral-950 text-[64px] md:text-[100px] leading-none font-display mb-4">
              Intervue
            </h1>

            {/* CTA Button */}
            <Link className="m-0 p-0 cursor-pointer z-20" href="/user-dashboard">
              <Button text="Get Started"/>
            </Link>
          </div>

          {/* Background Title */}
          <h1 className="absolute bottom-0 lg:text-[300px] md:text-9xl text-gray-200 font-extrabold tracking-tighter hidden md:block leading-none">
            Intervue
          </h1>
          <div className="absolute bottom-0 bg-gradient-to-b from-white/0 via-white/0 to-white z-20 w-screen h-1/3"></div>

          {/* Panda Image */}
          <Image
            src="/panda laptop.png"
            className="absolute bottom-0 translate-y-16.5"
            width={400}
            height={800}
            alt="Front Panda"
          />
        </div>
        <div className="bg-white h-screen w-full"></div>
      </div>
    </>
  );
};

export default Page;
