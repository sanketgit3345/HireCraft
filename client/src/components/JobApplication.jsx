import React, { useState ,useEfect} from "react";
import { Menu } from "@headlessui/react";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const JobApplication = ({ app, onViewMore }) => {
  const user = useSelector((state) => state.user.user);
  const { firstName, jobTitle, resume, _id } = app;
  const [isFetching, setIsFetching] = useState(false);

  const [status, setStatus] = useState(app.status);

  const handleStatusChange = async (newStatus) => {
    console.log("_id in application Card", _id);
    console.log("newSatus: ", JSON.stringify({ status: newStatus }));

    try {
      setIsFetching(true);
      console.log("user?.token", user?.token);

      const res = await apiRequest({
        url: "/application/update-application/" + _id,
        token: user?.token,
        data: JSON.stringify({ status: newStatus }),
        method: "PUT",
      });
      console.log("res?.data", res?.data);
      if (res.status !== "failed") {
        setStatus(res?.data);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(()=>{
    window.addEventListener('load',()=>{window.location.reload();})

    return ()=>{
      window.removeEventlistener('load',()=>{
        window.location.reload();
      })
    }
  },[]);

  const handleOpenResume = () => {
    window.open(resume, "_blank");
  };
  return (
    <div className="w-11/12 h-full flex flex-col md:flex-row bg-slate-300 shadow rounded items-center justify-center px-2 py-2 gap-6 mx-auto ">
      <div className="w-1/4 flex flex-col items-center mx-auto">
        <div className="flex items-center justify-between gap-2 font-semibold">
          <h2 className="">{firstName}</h2>
          <h2 className="">{app.lastName}</h2>
        </div>
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="w-1/4 flex flex-col justify-center items-center">
          <p className="font-semibold">Status</p>
          <p className="font-medium">{status}</p>
          <select
            value={"change Status"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="mt-2 rounded flex"
          >
            <option value="Submitted">Submitted</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Hold">Hold</option>
          </select>
        </div>
      )}
      <div className="w-1/4 flex flex-col justify-center items-center">
        <p className="font-semibold">Job Role</p>
        <p className="font-medium">{jobTitle}</p>
      </div>

      <div className="w-1/4 h-full flex items-center gap-4 md:justify-end justify-center pl-3">
        <CustomButton
          type="submit"
          onClick={handleOpenResume}
          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-green-600 hover:bg-green-800 px-8 py-2 text-sm font-semibold text-white focus:outline-none"
          title="Resume"
        />
        <CustomButton
          type="submit"
          onClick={onViewMore}
          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 hover:bg-blue-800 px-7 py-2 text-sm font-semibold text-white focus:outline-none"
          title="View More"
        />
      </div>
    </div>
  );
};

export default JobApplication;
