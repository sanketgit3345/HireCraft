import React, { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import CustomButton from "./CustomButton";

import TextInput from "./TextInput";
import { apiRequest } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Login,
  UpdatedUser,
  updateJobWithApplicationId,
} from "../redux/userSlice";

const ApplicationForm = ({ job, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const handleClose = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrMsg(null);

    const newData = { ...data };
    try {
      const res = await apiRequest({
        url: "/application/apply-job/" + job?._id,
        token: user?.token,
        data: newData,
        method: "POST",
      });
      console.log("Application res...", res);

      if (res.status === "failed") {
        setErrMsg(res.message);
      } else {
        const updatedUser = { ...user };
        updatedUser.application = [
          ...updatedUser.application,
          res?.applicationDetail?._id,
        ];
        updatedUser.appliedJobs = [
          ...updatedUser.appliedJobs,
          res?.applicationDetail?.job,
        ];
        dispatch(UpdatedUser(updatedUser));
        dispatch(Login(updatedUser));
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        setTimeout(() => {
          window.location.reload();
        }, 300000);
      }
      setSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl flex justify-center font-bold mb-4 bg-gradient-to-b from-[#ab43ed] to-[#e44d62] text-transparent bg-clip-text">
        Apply for {job?.company?.name}{" "}
      </h2>

      <h1 className="flex items-center justify-between flex-col text-xl">
        {job?.jobTitle}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4 justify-center items-center">
          <div className="flex gap-5 flex-col md:flex-row">
            <TextInput
              name="firstName"
              label="First Name"
              placeholder="Ritik"
              type="text"
              required={true}
              register={register("firstName", {
                required: "Enter your First Name",
              })}
              error={errors.firstName ? errors.firstName?.message : ""}
            />

            <TextInput
              name="lastName"
              label="Last Name"
              placeholder="Kumar"
              type="text"
              required={true}
              register={register("lastName", {
                required: "Enter your Last Name",
              })}
              error={errors.lastName ? errors.lastName?.message : ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5 m-2">
            <TextInput
              name="email"
              label="Email"
              placeholder="example@email.com"
              type="email"
              required={true}
              register={register("email", {
                required: "Enter your Email",
              })}
              error={errors.email ? errors.email?.message : ""}
            />

            <TextInput
              name="institution"
              label="College/Institution"
              placeholder="Institution"
              type="text"
              required={true}
              register={register("institution", {
                required: "College/Institution is required",
              })}
              error={errors.institution ? errors.institution?.message : ""}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <TextInput
              name="phone"
              label="Phone No."
              placeholder="1234567890"
              text="text"
              required={true}
              register={register("phone", {
                required: "Phone No. is required",
              })}
              error={errors.phone ? errors.phone?.message : ""}
            />

            <div className="flex flex-col mt-2">
              <label htmlFor="gender" className="text-gray-800 text-sm mb-1">
                Gender
              </label>
              <select
                {...register("gender")}
                className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-10 py-[10px]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not prefer to say">Not prefer to say</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 mb-2">
            <TextInput
              name="demoUrl"
              label="hushh proto demo link"
              placeholder="google drive link"
              text="text"
              required={true}
              register={register("demoUrl", {
                required: "hushh proto demo is required",
              })}
              error={errors.demoUrl ? errors.demoUrl?.message : ""}
            />
            <TextInput
              name="resume"
              label="Resume"
              placeholder="Google Drive link of resume"
              text="text"
              required={true}
              register={register("resume", {
                required: "Resume is required",
              })}
              error={errors.resume ? errors.resume?.message : ""}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5 mt-2">
            <CustomButton
              type="submit"
              containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
              title={submitting ? "Submitting" : "Submit"}
            />
            <CustomButton
              type="submit"
              containerStyles="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-8 py-2 text-sm font-medium text-white hover:bg-red-400 hover:text-red-900 hover:text-md focus:outline-none "
              title="Close"
              onClick={handleClose}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
