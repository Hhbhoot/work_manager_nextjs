import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  const { name, email, message } = await request.json();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
    <h2 style="color: #333; font-size: 24px;">New Contact Form Submission</h2>
    <p style="font-size: 16px; color: #555;">You have received a new message from your website's contact form. The details are as follows:</p>
    
    <table style="width: 100%; max-width: 600px; margin: 20px 0; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Name:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Email:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Message:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
      </tr>
    </table>

    <p style="font-size: 16px; color: #555;">You can reply directly to this email to respond to the sender.</p>

    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 14px; color: #999;">
      This message was sent from your website's contact form. Please do not share sensitive information through this form.
    </p>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        message: "Email sent successfully!",
        status: "success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to send email . Try again",
      },
      { status: 500 }
    );
  }
};
