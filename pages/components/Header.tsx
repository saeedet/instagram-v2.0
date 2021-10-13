import React from "react";
import Image from "next/image";

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
      {/* Logos */}
      <div className="w-24 relative hidden lg:inline-grid cursor-pointer">
        <Image
          alt="instagram"
          src="https://links.papareact.com/ocw"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
        <Image
          alt="instagram-logo"
          src="https://links.papareact.com/jjm"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Middle Search Input */}
      <div className="mt-1 relative p-3 rounded-md ">
        <div className=" absolute inset-y-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 block w-full pl-10 text-sm  sm:text-md border-gray-300 rounded-md focus:ring-black focus:border-black"
        />
      </div>
      {/* Right section */}
      <div className="flex justify-end items-center space-x-4">
        <HomeIcon className="navBtn" />
        <MenuIcon className="h-6 md:hidden cursor-pointer" />

        <div className="relative nvBtn">
          <PaperAirplaneIcon className="navBtn rotate-45" />
          <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 flex items-center justify-center animate-pulse rounded-full text-white">
            3
          </div>
        </div>
        <PlusCircleIcon className="navBtn" />
        <UserGroupIcon className="navBtn" />
        <HeartIcon className="navBtn" />
        <img
          className="h-10 rounded-full cursor-pointer"
          src="https://links.papareact.com/jjm"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Header;
