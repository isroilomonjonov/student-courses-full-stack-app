const nodemailer = require("nodemailer");

exports.sendVerificationMail = ({to, vercode}) => {
  console.log(to,vercode);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omonjonovisroil65@gmail.com",
      pass: "edqlihunoktwqgdb",
    },
  });
  // edqlihunoktwqgdbgmail
  const options = {
    from: "omonjonovisroil65@gmail.com",
    to: to,
    subject: "Verification mail",
    html:`<h1>Hi ${to}</h1><p>Please Verify</p><button style=padding:100px,background-color:blue><a href="https://student-courses-full-stack-app.vercel.app/verify/${vercode}">Verify</a></button>`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("email sent");
  });
};
