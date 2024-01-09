'use server';

import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async ({ to, text }: { to: string; text: string }) => {
  const msg = {
    to: 'contact@elegancewallpaper.com', // Change to your recipient
    from: 'contact@elegancewallpaper.com',
    subject: to,
    text: text
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email Sent!');
    })
    .catch(async (error) => {
      console.error(error.response.body);
    });
};
