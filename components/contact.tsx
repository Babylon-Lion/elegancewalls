'use client';

import { toast } from '@/components/ui/use-toast';
import { ChangeEvent, FC, useState } from 'react';
import { sendEmail } from '../lib/send-email';
export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    to: '',
    text: ''
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [id]: value });
  };
  async function onSubmit() {
    if (!formData.to || !formData.to.includes('@')) {
      toast({
        variant: 'destructive',
        description: 'Please enter a valid email address.'
      });
      return;
    }
    if (!formData.firstName || !formData.lastName) {
      toast({
        variant: 'destructive',
        description: 'Please enter your name.'
      });
      return;
    }

    if (!formData.text) {
      toast({
        variant: 'destructive',
        description: 'Please enter text'
      });
      return;
    }
    sendEmail(formData);
    toast({
      variant: 'default',
      description: 'Email sent!'
    });
  }

  return (
    <div className="bg-gray-50">
      <div className="h-full w-full items-start justify-center px-4 py-8 lg:flex xl:py-20">
        <div className="lg:mr-6 lg:w-1/2 xl:mr-12">
          <img
            tabIndex={0}
            src="https://i.ibb.co/n0f7Np4/pexels-anna-shvets-4588047-1.png"
            alt="image of a dog with heart"
            className="h-full w-full"
          />
          <div className="mt-8 flex flex-wrap items-center">
            <div className="mr-6 mt-4 w-full rounded border border-gray-200  py-6 pl-6 pr-9 md:mt-0 md:w-auto">
              <p className="text-base font-semibold leading-4 text-gray-900">Sales & Support</p>
              <p className="mt-4 text-base leading-4 text-gray-600">+18339000047</p>
              <p className="mt-2 text-base leading-4 text-gray-600">
                support@elegancewallpaper.com
              </p>
            </div>
            <div className="mr-6 mt-4 w-full rounded border border-gray-200 py-6 pl-6 pr-9 md:mt-0 md:w-auto lg:mt-4 xl:mt-0">
              <p className="text-base font-semibold leading-4 text-gray-900">
                Contractors & Distributors
              </p>
              <p className="mt-4 text-base leading-4 text-gray-600">18335861220</p>
              <p className="mt-2 text-base leading-4 text-gray-600">
                vendors@elegancewallpaper.com
              </p>
            </div>
          </div>
        </div>
        <div className="pt-4 lg:w-1/3 lg:pl-6 lg:pt-0 xl:pl-12">
          <h1
            aria-label="Get in touch"
            role="heading"
            className="text-3xl font-bold   text-gray-900"
          >
            Get in touch
          </h1>
          <p role="contentinfo" className="mt-4 hidden text-base leading-6 text-gray-600 lg:block">
            We`re eager to hear from you. Whether you have questions about our products, need design
            advice, or want to discuss a project, don`t hesitate to get in touch. <br /> Our
            friendly and knowledgeable team is here to assist you every step of the way, ensuring
            your interior design journey is seamless and inspiring{' '}
          </p>

          <div className="mt-10 items-center justify-between xl:flex">
            <div className="w-full md:w-1/2">
              <p className="mb-4 text-base font-medium leading-4 text-gray-800">First Name</p>
              <input
                value={formData.firstName}
                onChange={(e) => {
                  handleFormChange(e);
                }}
                type="text"
                id="firstName"
                aria-label="Please input first name"
                className="w-full rounded bg-gray-100 p-3 text-base leading-none text-gray-500 placeholder-gray-500"
                placeholder="eg. William"
              />
            </div>
            <div className="mt-4 w-full md:w-1/2 xl:ml-6 xl:mt-0">
              <p className="mb-4 text-base font-medium leading-4 text-gray-800">Last Name</p>
              <input
                value={formData.lastName}
                onChange={(e) => {
                  handleFormChange(e);
                }}
                type="text"
                id="lastName"
                aria-label="Please input Last name"
                className="w-full rounded bg-gray-100 p-3 text-base leading-none text-gray-500 placeholder-gray-500 "
                placeholder="eg. Smith"
              />
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-4 text-base font-medium leading-4 text-gray-800">Email Address</p>
            <input
              value={formData.to}
              onChange={(e) => {
                handleFormChange(e);
              }}
              type="text"
              id="to"
              aria-label="Please enter email"
              className="w-full rounded bg-gray-100 p-3 text-base leading-none text-gray-500 placeholder-gray-500"
              placeholder="eg. william.smith@doeco.com"
            />
          </div>

          <div className="mt-6">
            <p className="mb-4 text-base font-medium leading-4 text-gray-800">Message </p>
            <textarea
              id="text"
              value={formData.text}
              onChange={(e) => {
                handleFormChange(e);
              }}
              aria-label="Please leave comments"
              className="h-40 w-full resize-none rounded bg-gray-100 p-3 text-base leading-none text-gray-500 placeholder-gray-500"
              defaultValue={''}
            />
          </div>
          <button
            onClick={onSubmit}
            role="button"
            arial-label="send message "
            className="mt-12 rounded bg-indigo-700 px-8 py-6 text-base font-semibold leading-4 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
