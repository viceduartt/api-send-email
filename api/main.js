import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { emailContact, bodyMsg } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.SEND_FROM,
      subject: `New client from portfolio: ${emailContact}`,
      text: bodyMsg,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ status: "error" });
  }
}
