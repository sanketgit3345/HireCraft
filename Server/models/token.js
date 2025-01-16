// import mongoose, { Schema } from "mongoose";
// import { emailTemplate } from "../mail/Template/emailVerificationTemplate.js";
// import mailSender from "../utils/sendEmails.js";

// const tokenSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   token: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//     expires: 120,
//   },
// });

// async function sendVerificationEmail(email, token) {
//   try {
//     const mailResponse = await mailSender(
//       email,
//       "Verification Email from Hushh.ai",
//       emailTemplate(token)
//     );
//     console.log("Email Sent Successfully: ", mailResponse);
//   } catch (error) {
//     console.log("Error occured while Sending mails: ", error);
//     throw error;
//   }
// }

// tokenSchema.pre("save", async function (next) {
//   try {
//     // Ensure email uniqueness before saving
//     const existingToken = await this.constructor.findOne({ email: this.email });
//     if (existingToken) {
//       throw new Error("Token with the same email already exists");
//     }

//     if (this.isNew) {
//       await sendVerificationEmail(this.email, this.token);
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// export default mongoose.model("token", tokenSchema);

import mongoose, { Schema } from "mongoose";
import { emailTemplate } from "../mail/Template/emailVerificationTemplate.js";
import mailSender from "../utils/sendEmails.js";

const tokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 120,
  },
});

async function sendVerificationEmail(email, token) {
  try {
    const url = `http://localhost:3000/verify-email/${token}`;
    const mailResponse = await mailSender(
      email,
      "Verification Email from Hushh.ai",
      emailTemplate(url)
    );
    console.log("Email Sent Successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while Sending mails: ", error);
    throw error;
  }
}

tokenSchema.pre("save", async function (next) {
  try {
    // Ensure email uniqueness before saving
    const existingToken = await this.constructor.findOne({ email: this.email });
    if (existingToken) {
      // Token with the same email already exists
      throw new Error("Token with the same email already exists");
    }

    if (this.isNew) {
      await sendVerificationEmail(this.email, this.token);
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default mongoose.model("token", tokenSchema);
