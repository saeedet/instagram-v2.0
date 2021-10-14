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
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
// import { UserSession } from "../types/types";

const Header: React.FC = () => {
  const { data: session }: any = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  return (
    <div className="shadow-sm bg-white">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
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
        <div className=" relative p-3 rounded-md ">
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

        <div className="flex justify-end items-center space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
              <div className="relative nvBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute hidden md:flex -top-1 -right-2 text-xs w-5 h-5 bg-red-500  items-center justify-center animate-pulse rounded-full text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                className="h-10 rounded-full cursor-pointer"
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
