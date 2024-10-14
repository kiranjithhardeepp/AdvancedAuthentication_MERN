const { mailTrapClient, sender } = require("./mailTrapConfig");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./mailtrapTemplate");

const sendVerificationEmail = async (email, token) => {
  console.log("email===", email);
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      category: "Emial Verification",
    });

    console.log("email send succesfully");
  } catch (error) {
    console.log("error sending email", error);
    throw new error(`error sending verification email:${error}`);
  }
};

const sendWelcomeEmail = async (email, userName) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "6eb05176-c145-4211-bbf4-a352b7086c6a",
      template_variables: {
        company_info_name: "Auth Company",
        name: userName,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

const sendResetPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("reset password email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

const sendResetPasswordSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
};
