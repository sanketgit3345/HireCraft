import React from "react";
import { Manish, Justin, Sunaz } from "../../public/images/index.js";

const Hushher = () => {
  return (
    <div className="flex flex-col justify-center p-2 gap-2">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-3 p-4 w-full">
        {/* Left */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full">
          <img
            src={Manish}
            width={400}
            className="shadow-[0px_0px_20px_0] shadow-[#86d9dff1] hover:scale-110 transition-all duration-200 rounded-lg"
          />
        </div>
        {/* Right */}
        <div className="flex flex-col justify-between items-center w-full">
          <p className="text-3xl font-bold bg-gradient-to-b from-slate-900 to-slate-400 text-transparent bg-clip-text">
            Manish Sainani
          </p>
          <p className="text-xl font-semibold bg-gradient-to-b from-slate-900 to-slate-400 text-transparent bg-clip-text">
            Founder & CEO
          </p>
        </div>
      </div>

      {/* Justin */}
      <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-10 p-2 w-full m-4">
        {/* Left */}

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-4">
          <img
            src={Justin}
            width={350}
            className="shadow-[0px_0px_20px_0] shadow-[#dbee8ff1] hover:scale-110 transition-all duration-200 rounded-lg"
          />
        </div>
        {/* Right */}
        <div className="flex flex-col justify-between items-center w-full ">
          <p className="text-3xl font-bold bg-gradient-to-b from-slate-900 to-slate-400 text-transparent bg-clip-text rounded-lg">
            Justin Donaldson
          </p>
          <p className="text-xl font-semibold bg-gradient-to-b from-slate-900 to-slate-400 text-transparent bg-clip-text">
            Co-Founder & CTO
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-3 p-4 w-full mt-4">
        {/* Left */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full right-[10%]">
          <img
            src={Sunaz}
            width={400}
            className="shadow-[0px_0px_20px_0] shadow-[#40413ff1] hover:scale-110 transition-all duration-200 rounded-lg"
          />
        </div>
        {/* Right */}
        <div className="flex flex-col justify-between items-center w-full ">
          <p className="text-3xl font-bold bg-gradient-to-b from-slate-900 to-slate-400 text-transparent bg-clip-text rounded-lg">
            Sunaz Sharaf
          </p>
          <p className="text-xl font-semibold bg-gradient-to-b from-slate-900 to-slate-400 text-transparent bg-clip-text">
            GM - EMEA APAC
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hushher;
