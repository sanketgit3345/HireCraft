import React from "react";
import { Hush, about2 } from "../../public/images/index.js";
import { AutoWrite, Hushher } from "../components";

const About = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8 2xl:gap-14 py-3">
      <h1 className="text-3xl bg-gradient-to-b from-blue-900 to-blue-500 text-transparent bg-clip-text text-blue-600 font-bold mb-5 flex items-center justify-center mt-3">
        About Us
      </h1>
      <div className="w-full flex flex-col-reverse xl:flex-row flex-wrap gap-10 items-center p-5 mx-auto justify-center">
        <div className="w-full  2xl:w-2/4 flex flex-col-reverse xl:flex-row justify-between">
          <div className="flex flex-col-reverse xl:flex-row justify-between w-full p-4 gap-4 sm:textxl-">
            <div className="flex flex-col items-center justify-between xl:w-1/3 ">
              <h1 className="text-3xl bg-gradient-to-b from-[#28aeae] to-[#64f0f0] text-transparent bg-clip-text font-bold mb-5 flex flex-col justify-center mt-4">
                Our Vision
              </h1>
              <AutoWrite
                position={"lg:flex-row"}
                codeblock={`To build an ethical, consensual, and\n mutually beneficial data-sharing world that\n builds trust among users, developers, and brands`}
                codeColor={"text-violet-600"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
              />
            </div>

            <div className="flex flex-col items-center justify-between w-full xl:w-2/3 ">
              <h1 className="text-3xl bg-gradient-to-b from-[#28aeae] to-[#64f0f0] text-transparent bg-clip-text font-bold mb-5">
                Our Mission
              </h1>
              <AutoWrite
                position={"lg:flex-row"}
                codeblock={`Transparent, Secure, and Private platform \nfor sharing data with trusted partners and AI agents\n\nEmpower people to unlock value from their personal data​\n\n Helping brands to entrust their customers with their data ​`}
                codeColor={"text-indigo-600"}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
              />
            </div>
            <img
              src={Hush}
              alt="About"
              className="w-[350px] sm:w-[300px] sm:h-[300px] items-center justify-between flex mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 p-2">
          <img src={about2} />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-3xl font-bold bg-gradient-to-b from-[#E44D62] to-[#ed909d] text-transparent bg-clip-text mb-10">
            Our Impact
          </h1>
          <div className="flex flex-col bg-slate-300 rounded-lg items-center justify-center gap-10 m-4 p-4">
            <div className="bg-slate-700 rounded-md gap-10 p-6 text-lg">
              <p className="text-white">
                Data Autonomy: Empower your customers with full control over
                their personal data.
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg gap-10 p-6 text-lg">
              <p className="text-white ">
                Promoting Data Equity: Creating a fair and equitable environment
                for data sharing.
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg gap-10 p-6 text-lg">
              <p className="text-white text-wrap">
                Consent-Driven Excellence: Deliver bespoke experiences based on
                user consent and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center font-bold justify-center p-4 m-4">
          <p className="text-3xl bg-gradient-to-b from-purple-900 to-purple-400 text-transparent bg-clip-text">
            Meet Our Hushhers
          </p>
          <p className="text-xl font-semibold bg-gradient-to-b from-purple-900 to-purple-400 text-transparent bg-clip-text p-4">
            Leading With Purpose
          </p>
        </div>
        <Hushher />
      </div>
    </div>
  );
};

export default About;
