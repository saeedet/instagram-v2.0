import React from "react";

interface Props {
  img: string;
  username: string;
}

const Story: React.FC<Props> = ({ img, username }) => {
  return (
    <div className="">
      <img
        src={img}
        alt=""
        className="rounded-full h-14 w-14 p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
