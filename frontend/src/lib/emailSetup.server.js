import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASSWORD, GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD, EMAIL_SERVER, EMAIL_PORT } from "$env/static/private";

// let transporter = nodemailer.createTransport({
//   host: EMAIL_SERVER,
//   port: EMAIL_PORT,
//   secure: true,
//   auth: {
//     user: EMAIL,
//     pass: EMAIL_PASSWORD,
//   },
// });
let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_EMAIL_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export default transporter;