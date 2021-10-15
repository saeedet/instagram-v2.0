import React, { useEffect, useState } from "react";
import faker from "faker";
import { Member } from "../types/types";
const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<[] | Member[]>([]);

  useEffect(() => {
    const suggestions: Member[] = [...Array(5)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between ">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold text-sm">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            src={profile.avatar}
            alt=""
            className="rounded-full w-10 h-10 border p-[2px] cursor-pointer"
          />

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm hover:underline cursor-pointer">
              {profile.username}
            </h2>
            <h3 className="text-xs text-gray-400">{profile.email}</h3>
          </div>
          <button className="text-blue-400 text-sm font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
