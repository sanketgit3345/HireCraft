// import Users from "../models/userModel.js";

// export const register = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   // Validate fields
//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "All Fields are required",
//     });
//   }
//   try {
//     const userExist = await Users.findOne({ email });

//     if (userExist) {
//       return res.status(400).json({
//         success: false,
//         message: "Email Address already exists",
//       });
//     }

//     const user = await Users.create({
//       firstName,
//       lastName,
//       email,
//       password,
//     });

//     // user token
//     const token = await user.createJWT();

//     res.status(201).send({
//       success: true,
//       message: "Account created successfully",
//       user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         accountType: user.accountType,
//       },
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ success: false, message: error.message });
//   }
// };

// export const signIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const user = await Users.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist please register",
//       });
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Password does not match",
//       });
//     }

//     user.password = undefined;

//     const token = user.createJWT();

//     res.status(201).json({
//       success: true,
//       message: "Login Successfully",
//       user,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ success: false, message: error.message });
//   }
// };

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import token from "../models/token.js";
import mailSender from "../utils/sendEmails.js";

export const sendVerificationToken = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }
    const vToken = crypto.randomBytes(20).toString("hex");
    console.log("Token Generated: ", vToken);

    const tokenPayload = { email, token: vToken };

    const tokenBody = await token.create(tokenPayload);
    console.log("Token Body: ", tokenBody);

    res.status(200).json({
      success: true,
      message: "Token sent successfully",
      vToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    console.log("Register");
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // validate sign-up data
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Please enter all the fields properly",
      });
    }

    //match password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password fields doesn't match, Please try again",
      });
    }

    // Check if User already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }
    // let verified = false;

    //find most recent token stored for the user

    // const recentToken = await token
    //   .find({ email })
    //   .sort({ createdAt: -1 })
    //   .limit(1);
    // console.log(recentToken);
    // //validate Token
    // if (recentToken.length == 0) {
    //   //Token not found
    //   return res.status(400).json({
    //     success: false,
    //     message: "Token not found",
    //   });
    // } else if (vToken !== recentToken[0].token) {
    //   //Invalid Token
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid Token",
    //   });
    // } else {
    //   verified = true;
    // }

    //Hash Password

    const HashedPassword = await bcrypt.hash(password, 10);

    //Create entry of all the profile details in DB

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: HashedPassword,
    });

    console.log("Reached near completion");
    // return res
    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registered, Please try again",
    });
  }
};

// signin
export const signIn = async (req, res) => {
  console.log("user SgnIn");
  try {
    //get data from req body
    const { email, password } = req.body;
    //validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All field is required, Please try again",
      });
    }

    // Check user exists or not

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        succcess: false,
        message: "User is not registered, Please Signup",
      });
    }

    // Generate JWT, after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      console.log("Auth Controller accountType:", user.accountType);

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      user.toObject();
      user.token = token;
      user.password = undefined; // It is use to remove the password from user

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // In cookie there are three options "tokenname" , "token-instance" & "options".
      //and cookie is used to sent back in response after user make a request to the server and cookie is stored at the client side
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, Please Try Again",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    //get oldpassword, newpassword,confirmNewpassword
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    //validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // compare new password and confirmNewpassword
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password fields doesn't match, Please try again",
      });
    }

    // Match between old passwords && update password in database
    const user = await User.findById(req.user.id);
    if (await bcrypt.compare(oldPassword, user.password)) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      const [updatedUserDetails, emailResponse] = await Promise.all([
        User.findByIdAndUpdate(
          req.user.id,
          {
            password: newHashedPassword,
          },
          { new: true }
        ),
        mailSender(
          userDetails.email,
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        ),
      ]);

      console.log("Email sent successfully: ", emailResponse.response);

      return res.status(200).json({
        success: true,
        message: "Password Changed successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Please enter correct old password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Changing password failed",
    });
  }
};
