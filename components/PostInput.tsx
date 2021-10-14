import React from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";

const PostInput: React.FC = () => {
  return (
    <form className="flex items-center p-4">
      <EmojiHappyIcon className="h-7" />
      <input
        type="text"
        placeholder="Add a comment..."
        className="border-none flex-1 focus:ring-0 outline-none px-2"
      />
      <button className="font-semibold text-blue-400">Post</button>
    </form>
  );
};

export default PostInput;
