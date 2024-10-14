const { MailtrapClient } = require("mailtrap");

const TOKEN = "4a0b621a5d83c6f32f63c29392fe2c83";

const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

module.exports = { mailTrapClient, sender };
