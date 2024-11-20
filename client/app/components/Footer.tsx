import Link from 'next/link';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <h2 className="text-[40px] font-Popins font-[700] text-gradient mt-6">
        TP-Elearning
      </h2>
      <footer className="footer-gradient">
        <div className="p-3">
          <div className="mt-6 w-[95%] 800px:w-full 800px:max-w-[95%] px-2 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-3">
                <h3 className="text-[25px] font-[700] font-Popins text-black dark:text-white">
                  About
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/about"}
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/privacy-policy"}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/faq"}
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-[25px] font-[700] font-Popins text-black dark:text-white">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/courses"}
                    >
                      Our Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/"}
                    >
                      Github
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-[25px] font-[700] font-Popins text-black dark:text-white">
                  Social Link
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/courses"}
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/"}
                    >
                      Instagram
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-[25px] font-[700] font-Popins text-black dark:text-white">
                  Contact Information
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/courses"}
                    >
                      Phone-number: 0123.456.789
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/"}
                    >
                      Email: admin@gmail.com
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black dark:text-white font-Josefin text-[20px] font-[600]"
                      href={"/"}
                    >
                      Address: 05, Tran Van On Street, Phu Hoa, Thu Dau Mot,
                      Binh Duong
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
