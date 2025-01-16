import React, { useEffect, useState } from "react";
import { JobApplication, Loading } from "../components";
import { useLocation, useParams } from "react-router-dom";
import { apiRequest } from "../utils";
import { useSelector } from "react-redux";
import JobApplicationModal from "../components/JobApplicationModal";

const ViewApplication = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchViewApplication = async () => {
    setIsFetching(true);

    try {
      const res = await apiRequest({
        url: "/application/company-getapplication/" + id,
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

  const handleViewMore = (application) => {
    setIsFetching(true);
    setSelectedApplication(application);
    setIsModalOpen(true);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchViewApplication();
  }, []);
  return (
    <div className="w-full h-[calc(100vh-3.5rem)]">
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <h2 className="flex flex-col items-center justify-center font-bold text-xl mt-10 mb-10">
            Applications
          </h2>
          <div className="w-full flex flex-col gap-6">
            {isFetching ? (
              <Loading />
            ) : (
              data.map((app, index) => (
                <JobApplication
                  app={app}
                  key={index}
                  onViewMore={() => handleViewMore(app)}
                />
              ))
            )}
          </div>
        </div>
      )}
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {isModalOpen && (
            <JobApplicationModal
              application={selectedApplication}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ViewApplication;
