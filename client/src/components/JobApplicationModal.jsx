import React, { useEffect, useRef } from "react";
import CustomButton from "./CustomButton";

const JobApplicationModal = ({ application, onClose }) => {
  const {
    firstName,
    lastName,
    gender,
    institution,
    jobTitle,
    phone,
    resume,
    demoUrl,
  } = application;

  const modalRef = useRef(null);

  const handleOpenResume = () => {
    window.open(resume, "_blank");
  };

  const handleHushProtoDemo = () => {
    window.open(demoUrl, "_blank");
  };

  const handleCloseModal = (e) => {
    console.log("Clicked: ", e.target);
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      console.log("Closing modal:");
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 m-2" ref={modalRef}>
        <div className="flex flex-col items-center justify-between leading-8 mt-3">
          <h2 className="text-2xl font-semibold">
            {firstName} {lastName}
          </h2>
          <p>
            Gender:<span>{gender}</span>{" "}
          </p>
          <p>
            Institution: <span>{institution}</span>
          </p>
          <p>
            Job Title:<span>{jobTitle}</span>{" "}
          </p>
          <p>
            Phone:<span> {phone}</span>
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-4 gap-2 rounded p-6">
          <CustomButton
            onClick={handleOpenResume}
            containerStyles="bg-green-600 text-white hover:bg-green-800 px-4 py-2 rounded font-semibold"
            title="Resume"
          />
          <CustomButton
            onClick={handleHushProtoDemo}
            containerStyles="bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded font-semibold"
            title="Hushh Proto Demo"
          />
          <CustomButton
            onClick={onClose}
            containerStyles="bg-red-600 text-white hover:bg-red-800  px-4 py-2 rounded font-semibold"
            title="Close"
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
