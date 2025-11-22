import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from 'cors'
import serverless from "serverless-http";

dotenv.config()

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/sendEmail", async (req, res) => {
  const { emailContact, bodyMsg } = req.body;

  
  try {
      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
            }
        });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.SEND_FROM,
      subject: "New client from portfolio: " + emailContact,
      text: bodyMsg,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({ status: "ok"});
  } catch (err) {
    res.json({ status: "error"});

  }
});

export const handler = serverless(app);
