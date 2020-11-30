const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./src/routes/index"));

app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  contentHTML = `
      <h1>User Information</h1>
      <ul>
        <li>User Name: ${name}</li>
        <li>User Email: ${email}</li>
        <li>User Phone: ${phone}</li>
      </ul>
      <p>${message}</p>
    `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "pruebaestadisticas2@gmail.com",
      pass: "Medy917.",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "'Kemus Corp. Server' <pruebaestadisticas2@gmail.com>",
    to: "sntwandy@gmail.com",
    subject: "Kemus Corp. contact form submit",
    html: contentHTML,
  });

  console.log("Message sent", info.messageId);

  res.redirect("/sucess.html");
});

app.use(express.static(path.join(__dirname, "src/public")));

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
