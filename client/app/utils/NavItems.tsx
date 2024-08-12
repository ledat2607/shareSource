import Link from 'next/link';
import React from 'react'

type Props = {
  activeItem: number;
  isMobile: boolean;
};
export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
];
const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link passHref key={index} href={i.url}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-green-500 text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Popins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-2">
          <div className="w-full text-center py-8">
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link key={index} href={i.url} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-green-500 text-[crimson]"
                        : "dark:text-white text-black"
                    } block text-[15px] py-5 px-8 font-Popins font-[700]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems