"use client";
import React, { useState } from "react";
import Image from "next/image";
import contactImg from "../../public/assets/contact.png"; // Thay đổi đường dẫn hình ảnh
import Header from "../components/Header";
import toast from "react-hot-toast";

type Props = {};

const ContactPage = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const handleSubmitForm =()=>{
    toast.success("Send contact information successfull !");
  }
  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={3}
      />

      <div className="relative min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 dark:from-gray-900 dark:to-gray-800 opacity-50 animate-gradient"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-10 px-5">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                <Image
                  src={contactImg}
                  alt="Contact Us"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-lg mb-6">
                  We'd love to hear from you! Please fill out the form below and
                  we'll get in touch with you as soon as possible.
                </p>
                <form action="#" method="POST" className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-lg font-semibold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-lg font-semibold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmitForm}
                    type="submit"
                    className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;