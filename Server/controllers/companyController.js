import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";
import { response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  //   validate fields
  if (!name) {
    next("Company Name is required");
    return;
  }

  if (!email) {
    next("Company email is required");
    return;
  }

  if (!password) {
    next("Company password is required");
    return;
  }

  if (!confirmPassword) {
    next("Company confirmPassword is required");
    return;
  }

  if (password !== confirmPassword) {
    next("Password and confirmPassword should have same value");
    return;
  }

  try {
    const accountExist = await Companies.findOne({ email });

    if (accountExist) {
      next("Company Already Registered, Please Login");
      return;
    }

    const HashedPassword = await bcrypt.hash(password, 10);
    //Create a New account for company
    const company = await Companies.create({
      name,
      email,
      password: HashedPassword,
    });
    res.status(200).json({
      success: true,
      company,
      message: "Company Account Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      next("Please provide company credentails");
      return;
    }

    const company = await Companies.findOne({ email });

    if (!company) {
      next("Invalid email or Password");
      return;
    }

    //compare password

    if (await bcrypt.compare(password, company.password)) {
      const payload = {
        email: company.email,
        id: company._id,
        accountType: company.accountType,
      };

      console.log("PayLoad Data", payload);

      console.log("Company Controller accountType:", company.accountType);

      const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      company.toObject();
      company.token = token;
      company.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      console.log("Company controller", company);

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        company,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log("error...", error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCompanyProfile = async (req, res, next) => {
  const { name, contact, location, profileUrl, about } = req.body;

  try {
    // validation
    if (!name || !location || !about || !contact || !profileUrl) {
      next("Please Provide All Required fields");
      return;
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Company with id: ${id}`);
    }

    const updateCompany = {
      name,
      contact,
      location,
      profileUrl,
      about,
      _id: id,
    };

    const company = await Companies.findByIdAndUpdate(id, updateCompany, {
      new: true,
    });

    const token = company.createJWT();

    company.password = undefined;

    res.status(200).json({
      success: true,
      message: "Company Profile Updated SUccessfully",
      company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCompanyProfile = async (req, res, next) => {
  try {
    const id = req.body.user.userId;
    console.log("id...", id);
    const company = await Companies.findById({
      _id: id,
    });

    if (!company) {
      return res.status(400).json({
        message: "Company not Found",
        success: false,
      });
    }

    company.password = undefined;
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const { search, sort, location } = req.query;

    let queryObject = {};

    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }
    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    let queryResult = Companies.find(queryObject).select("-password");

    //sorting

    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("name");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-name");
    }

    // pagination

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // records count

    const total = await Companies.countDocuments(queryResult);
    const numOfPage = Math.ceil(total / limit);

    // Move to next page
    // queryResult = queryResult.skip(skip).limit(limit);

    // show more instead of moving next page

    queryResult = queryResult.limit(limit * page);

    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      data: companies,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyJobListing = async (req, res, next) => {
  const { search, sort } = req.query;
  const id = req.body.user.userId;
  try {
    // conditions for searching filters
    const queryObject = {};

    if (search) {
      queryObject.location = { $regex: search, $options: "i" };
    }

    let sorting;

    if (sort === "Newest") {
      sorting = "-createdAt";
    }
    if (sort === "Oldest") {
      sorting = "createdAt";
    }
    if (sort === "A-Z") {
      sorting = "name";
    }
    if (sort === "Z-A") {
      sorting = "-name";
    }

    let queryResult = await Companies.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: sorting },
    });

    const companies = queryResult;

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Get Company by Id...", id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }
    const company = await Companies.findById(id).populate({
      path: "jobPosts",
      options: {
        sort: "-_id",
      },
    });

    if (!company) {
      return res.status(200).json({
        success: false,
        message: "Company not Found",
      });
    }

    company.password = undefined;

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: true,
      message: error.message,
    });
  }
};
