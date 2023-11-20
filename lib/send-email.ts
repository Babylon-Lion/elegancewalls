'use server';

import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async ({ to, text }: { to: string; text: string }) => {
  const msg = {
    to: 'sbkobaidze@gmail.com', // Change to your recipient
    from: 'elegancewalls@gmail.com', // Change to your verified sender
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
