import applications from "../models/application.js";
import User from "../models/userModel.js";
import Jobs from "../models/jobsModel.js";
import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";

export const createApplication = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    demoUrl,
    institution,
    phone,
    gender,
    resume,
  } = req.body;

  const id = req.body.user.userId;
  const { jobId } = req.params;

  try {
    // Check if the user has already applied for the job
    const existingApplication = await applications.findOne({
      user: id,
      job: jobId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !demoUrl ||
      !institution ||
      !gender ||
      !resume
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No user with id: ${id}`);
    }

    const job = await Jobs.findById(jobId).populate("company").exec();
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const { name: companyName, profileUrl: companyProfileUrl } = job.company;
    const { jobTitle } = job;

    console.log("jobTitle in createApplication", jobTitle);

    const applicationDetail = await applications.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      demoUrl: demoUrl,
      institution: institution,
      phone: phone,
      gender: gender,
      user: id,
      job: jobId,
      resume: resume,
      companyName,
      companyProfileUrl,
      jobTitle,
    });

    await User.findByIdAndUpdate(id, {
      $push: {
        application: applicationDetail._id,
        appliedJobs: applicationDetail.job,
      },
    });

    if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
      await Jobs.findByIdAndUpdate(jobId, {
        $push: {
          applications: applicationDetail._id,
          applicants: id,
        },
      }).exec();
    }

    return res.status(200).json({
      success: true,
      message: "Aplication Created successfully",
      applicationDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create aplication",
      error: error.message,
    });
  }
};

export const getAllApplicationsForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const id = req.body.user.userId;

    const isValidUser = await Companies.findOne({
      _id: id,
      jobPosts: jobId,
    });

    if (!isValidUser) {
      return res.status(404).json({
        success: false,
        message: "You are not authorized to see this application detail",
      });
    }

    const job = await Jobs.findById(jobId).populate("applications");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job.applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch all application for a particular jobs",
    });
  }
};

export const getAllApplicationsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate({ path: "application" })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const allApplications = [...user.application];

    return res.status(200).json({
      success: true,
      data: allApplications,
      message: "Able to fetch all the application from user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch all the application from user",
    });
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Validate that the status is one of the allowed values
    if (
      ![
        "Submitted",
        "Interview",
        "Hold",
        "Rejected",
        "Offer",
        "Reviewed",
      ].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values are 'Submitted', 'Hold', 'Rejected' 'Reviewed','Offer','Interview'.",
      });
    }

    const updatedApplication = await applications.findByIdAndUpdate(
      applicationId,
      { status: status },
      { new: true }
    );

    if (!updatedApplication) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedApplication,
      message: "Status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the status",
      error: error.message,
    });
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    // Find the application by ID
    const application = await applications.findById(applicationId);

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    // Remove application ID from user's application array
    await User.findByIdAndUpdate(application.user, {
      $pull: { application: applicationId },
    });

    // Remove application ID from job's applications array
    await Jobs.findByIdAndUpdate(application.job, {
      $pull: { applications: applicationId },
    });

    // Delete the application
    await applications.findByIdAndDelete(applicationId);

    return res
      .status(200)
      .json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the application",
      error: error.message,
    });
  }
};
