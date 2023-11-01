'use client';

import { FormEvent, useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          message
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
    } catch (err: any) {
      console.log('Error', err);
    }

    // const data = {
    //   name: String(event.target.name.value),
    //   email: String(event.target.email.value),
    //   message: String(event.target.message.value)
    // };

    // const response = await fetch('../api/email/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });

    // if (response.ok) {
    //   console.log('Message sent successfully');
    //   setLoading(false);
    //   // reset the form
    //   event.target.name.value = '';
    //   event.target.email.value = '';
    //   event.target.message.value = '';
    // }
    // if (!response.ok) {
    //   console.log('Error sending message');
    //   setLoading(false);
    // }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4 flex w-full flex-col">
        <label className="font-bold text-gray-800" htmlFor="name">
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          minLength={3}
          maxLength={150}
          required
          className=" border border-gray-100 bg-gray-50 p-4 "
          autoComplete="off"
          id="name"
        />
      </div>
      <div className="my-4 flex w-full flex-col">
        <label className="font-bold text-gray-800" htmlFor="email">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          minLength={5}
          maxLength={150}
          required
          className=" border border-gray-100 bg-gray-50 p-4 "
          autoComplete="off"
          id="email"
        />
      </div>
      <div>
        <label className="font-bold text-gray-800" htmlFor="message">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          minLength={10}
          maxLength={500}
          name="message"
          className="w-full border border-gray-100 bg-gray-50 p-4 "
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-40 bg-gray-700 px-4 py-2 font-medium text-white disabled:bg-gray-400 disabled:text-gray-100"
      >
        Send Message
      </button>
    </form>
  );
}
