const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@jayhooray.com',
    pass: 'Jahjah303!'
  }
});

app.post('/signup', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: '"Mr. Hooray" <hello@jayhooray.com>',
    to: email,
    subject: '🎉 Welcome to JayHooray!',
    html: `<h1>Snap & Spark Activated!</h1><p>Thanks for signing up. Mr. Hooray is prepping your bundle!</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Email failed');
    }
    res.send('Email sent successfully');
  });
});


app.listen(3000, () => console.log('Server running on port 3000'));
