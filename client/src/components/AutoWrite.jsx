import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
export const AutoWrite = ({
  position,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} my-10 justify-between flex-col gap-10 border-slate-gray`}
    >
      {/* Section 1 */}
      <div className="h-fit sm:text-2xl lg:text-sm code-border flex flex-row text-[10px] leading-[18px] sm:leading-6 w-[100%] relative py-3 lg:w-[500px]">
        {/* BG-gradient-HW */}
        {backgroundGradient}
        <div className="text-center flex flex-col w-[10%] text-white font-inter font-bold">
          <p>1</p>
          <p>-</p>
          <p>-</p>
          <p>2</p>
          <p>-</p>
          <p>3</p>
          <p>-</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold sm:text-2xl font-mono ${codeColor} pr-2 lg:text-sm`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true} //we don't want animate in reverse dirn.
          />
        </div>
      </div>
    </div>
  );
};

export default AutoWrite;
