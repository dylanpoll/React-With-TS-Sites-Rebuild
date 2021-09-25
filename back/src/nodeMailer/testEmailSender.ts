import "dotenv-safe/config";
import {basebuild} from "./baseTemplate";
import { sendmail } from "./Nodemailer";
export function emailTester(){
        //this is used for testing out email sending
        let testgreeting:string = "John Smith";       //this is just used to test string html construction at the moment. I will make a param var later
        let whoWillRecieve:string | undefined = process.env.NODEMAILER_TESTEMAILADDRESSTOSEND;
        let subTitleLine:string|undefined = 'testing out';
        let mailBody:string = basebuild(testgreeting);  // this will go to the template I made and eventually factor in user data and pass it as a param
        sendmail(whoWillRecieve,subTitleLine,mailBody);  //test delivery of mail
}