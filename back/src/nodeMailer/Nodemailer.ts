import "dotenv-safe/config";
import nodemailer from "nodeMailer";

const HOST: string | undefined = process.env.NODEMAILER_HOST; //I do not want to have these values exposed on my repo and to avoid type definition 
var importPort: any = process.env.NODEMAILER_PORT;//issues this is my workaround, I will improve this at a later time. This only works if they are global
const PORT: number | undefined = +importPort;
var importSecure: any = process.env.NODEMAILER_SECURE;
const SECURE: boolean | undefined = importSecure;

// async..await is not allowed in global scope, must use a wrapper
export async function sendmail(whoWillRecieve:string|undefined,subTitleLine:string|undefined,mailBody:string|undefined) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: SECURE, 
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS, 
      },
    });
    //let info =    //uncomment this along with console.log to check if a email is sent with a terminal statement
    await transporter.sendMail({      // send mail with defined transport object
      from: '"'+ process.env.NODEMAILER_SENDERNAME +'" <' + process.env.NODEMAILER_EMAIL +'>', // This if not correct depending on the service may auto correct
      to: whoWillRecieve, 
      subject: subTitleLine, 
      html: mailBody,     
    });
    //console.log("Message sent: %s", info.messageId); // this will print a validation code to show in terminal that a email was sent successfully.
  }
