"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import img from "../../public/assets/aboutus.png";
import Header from '../components/Header';

type Props = {};

const AboutPage = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto p-5 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0">
              <Image
                src={img}
                alt="About Us"
                width={400}
                height={400}
                className="rounded-full border-4 border-blue-500 shadow-lg"
              />
            </div>
            <div className="mt-5 md:mt-0 md:ml-5 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-3">About Us</h1>
              <p className="text-lg mb-4">
                We are a passionate team dedicated to creating amazing web
                experiences. Our goal is to provide high-quality services that
                meet the needs of our clients and exceed their expectations.
              </p>
              <p className="text-lg mb-4">
                With years of experience in the industry, we specialize in web
                development, design, and digital marketing. Our team is always
                up-to-date with the latest trends and technologies to ensure we
                deliver the best solutions.
              </p>
              <p className="text-lg">
                Thank you for visiting our site. We look forward to working with
                you and bringing your ideas to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
