import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req, res, next) => {
  console.log("in auth Middleware");
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decode...", decode);
      req.body.user = {
        userId: decode.id,
        accountType: decode.accountType,
      };

      console.log("userId...", req.body.user.userId);
      console.log("accountType...", req.body.user.accountType);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//Seeker
export const isSeeker = async (req, res, next) => {
  try {
    if (req.body.user.accountType !== "seeker") {
      //we had saved accountType in payload in controller(in login when password is checking) and when we decode token in auth to verify the token
      return res.status(401).json({
        // and we done req.user = decode; So accountType is also saved in user
        success: false,
        message: "This is a protected route for seeker only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//Company
export const isCompany = async (req, res, next) => {
  try {
    console.log("accountType in IsCompany", req.body.user.accountType);
    if (req.body.user.accountType !== "company") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for company only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
