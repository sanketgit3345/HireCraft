import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ApplicationCard, Loading } from "../components";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";

const ApplicationHistory = () => {
  const user = useSelector((state) => state.user.user);
  const { _id: id } = user;

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  const fetchApplication = async () => {
    setIsFetching(true);

    try {
      const res = await apiRequest({
        url: "/application/user-getapplication/" + id,
        token: user?.token,
        method: "GET",
      });
      setData(res?.data);
      setIsFetching(false);
    } catch (error) {
      console.log("Error: ", error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);
  return (
    <div className="w-full h-[calc(100vh-3.5rem)]">
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <h2 className="flex flex-col items-center justify-center font-bold text-xl mt-10 mb-10">
            Application details
          </h2>
          <div className="w-full flex flex-col gap-6">
            {data.map((app, index) => (
              <ApplicationCard app={app} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationHistory;
