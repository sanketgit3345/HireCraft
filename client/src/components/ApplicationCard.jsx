import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const ApplicationCard = ({ app }) => {
  const { companyName, companyProfileUrl, jobTitle, status } = app;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-11/12 h-full flex flex-col md:flex-row bg-white shadow rounded items-center justify-center px-2 py-2 gap-6 mx-auto">
      <div className="w-1/4 flex flex-col items-center mx-auto">
        <Link to={`/job-detail/${app.job}`}>
          <div className="flex flex-col items-center justify-between">
            <img
              src={companyProfileUrl}
              alt={companyName}
              className="h-8 w-8 md:w-12 md:h-12 rounded "
            />
            <h2 className="font-semibold m-2 p-2 flex">{companyName}</h2>
          </div>
        </Link>
      </div>
      <div className="w-1/4 flex flex-col justify-center items-center">
        <p className="font-semibold">Status</p>
        <p className="font-medium">{status}</p>
      </div>
      <div className="w-1/4 flex flex-col justify-center items-center">
        <p className="font-semibold">Job Role</p>
        <p className="font-medium">{jobTitle}</p>
      </div>

      <div className="w-1/4 h-full flex flex-col items-center">
        <CustomButton
          type="submit"
          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-sm font-medium text-white focus:outline-none cursor-default"
          title="Applied"
        />
      </div>
    </div>
  );
};

export default ApplicationCard;
