import nodemailer from "NodeMailer";
// async..await is not allowed in global scope, must use a wrapper
export async function sendmail() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'dylanmanpoll@gmail.com', // generated ethereal user
        pass: '', // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Dylan Poll" <dylanmanpoll@gmail.com>', // sender address
      to: "dylanmanpoll@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
  sendmail().catch(console.error);