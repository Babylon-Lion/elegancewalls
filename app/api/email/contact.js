import nodemailer from 'nodemailer';

export default async function contactAPI(req, res) {
  const { name, email, message } = req.body;
  const user = process.env.MAIN_EMAIL;
  const data = { name, email, message };
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: process.env.APP_PASS
    }
  });
  try {
    const mail = await transporter.sendMail({
      from: user,
      to: 'support@elegancewallpaper.com',
      replyTo: email,
      subject: `Contact Form submission from ${name}`,
      html: `<p>name: ${name}</p>
            <p>email: ${email}</p>
            <p>message: ${message}</p>`
    });
    console.log('message sent to:', mail.messageId);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: 'Could not send message, please send us an email at support@elegancewallpaper.com'
      });
  }
}
