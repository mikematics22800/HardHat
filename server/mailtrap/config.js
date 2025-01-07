import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: token
}); 

const sender = {
  email: "hello@demomailtrap.com",
  name: "Michael",
};
const recipients = [
  {
    email: "mikematics22800@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);