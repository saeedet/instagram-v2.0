import { signOut, useSession } from "next-auth/react";
import React from "react";

const MiniProfile: React.FC = () => {
  const { data: session }: any = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image}
        alt=""
        className="rounded-full w-16 h-16 border p-[2px]"
      />

      <div>
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
