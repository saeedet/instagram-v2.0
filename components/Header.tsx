import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header: React.FC = () => {
  const { data: session }: any = useSession<boolean>();
  const [_, setOpen] = useRecoilState(modalState);
  const router: NextRouter = useRouter();

  return (
    <div className="shadow-sm  border-b bg-white fixed top-0 w-full z-20">
      <div className="flex justify-between max-w-5xl mx-5 lg:mx-auto h-[53px]">
        {/* Left */}
        <div
          className="w-24 relative cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            alt="instagram"
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className=" relative p-3 rounded-md hidden sm:inline-block ">
          <div className=" absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 block w-full pl-10 py-1 text-sm  sm:text-md border border-gray-300 rounded-md focus:ring-black focus:border-black"
          />
        </div>
        {/* Right section */}

        <div className="flex justify-end items-center space-x-2 md:space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          {session ? (
            <>
              <div className="relative nvBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute hidden md:flex top-0 -right-1 text-xs w-4 h-4 bg-red-500  items-center justify-center rounded-full text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <HeartIcon className="navBtn" />
              <img
                className="h-6 rounded-full cursor-pointer transform transition-all duration-100 active:scale-90"
                src={session?.user.image}
                alt="profile"
                onClick={() => signOut()}
              />
            </>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
