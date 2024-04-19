import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/logo.png";
const NavbarItem = ({ title, classProps, to }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      <Link to={to}>{title}</Link>
    </li>
  );
};

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[

          { title: 'CryptoCurrencies', to: '/Cryptocurrencies' },
          { title: 'Exchanges', to: '/exchanges' },
          { title: 'News', to: '/news' },
        ].map((item, index) => (
          <NavbarItem key={item.title + index} title={item.title} to={item.to} />
        ))}


      </ul>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
      <p className="text-white text-sm text-center font-medium mt-2">info@crypto.com</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@crypto2023</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;