import React, { useEffect, useState } from "react";
import Story from "./Story";
import faker from "faker";
import { Member, UserSession } from "../types/types";
import { useSession } from "next-auth/react";

const Stories: React.FC = () => {
  const { data: session } = useSession<boolean>();
  const [suggestions, setSuggestions] = useState<Member[]>([]);
  useEffect(() => {
    const suggestions: Member[] = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.name} />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
