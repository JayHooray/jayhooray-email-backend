const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Mr. Hooray is live and snapping!");
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS
    }
  });

  const mailOptions = {
    from: `"Mr. Hooray 🎉" <hello@jayhooray.com>`,
    to: email,
    subject: "Welcome to JayHooray!",
    html: `<h1>Snap & Spark Activated!</h1><p>You're officially on the list. Mr. Hooray is prepping your bundle with joy and momentum.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent");
  } catch (error) {
    console.error("Email failed:", error);
    res.status(500).send("Email failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


