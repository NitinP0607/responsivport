const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "patelnitin1299@gmail.com",        // replace with your Gmail
      pass: "wtkd yzwh wann gnhg",           // generate an "App Password" 
    },
  });

  const mailOptions = {
    from: email,
    to: "patelnitin1299@gmail.com",            // where to receive the message
    subject: "New Contact Form Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "You Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
