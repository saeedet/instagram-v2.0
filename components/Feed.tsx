import { useSession } from "next-auth/react";
import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed: React.FC = () => {
  const { data: session }: any = useSession();
  return (
    <div
      className={`flex flex-col md:flex-row md:max-w-3xl xl:max-w-5xl mt-[53px]  mx-auto ${
        !session && "justify-center"
      }`}
    >
      {/* Left Section */}
      <section className="flex flex-col w-full md:w-4/5 xl:w-2/3 mx-auto xl:mx-0">
        <Stories />
        <Posts />
      </section>

      {/*  Right Section */}
      {session && (
        <section className="hidden xl:flex flex-col">
          <div className="fixed">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </div>
  );
};

export default Feed;
