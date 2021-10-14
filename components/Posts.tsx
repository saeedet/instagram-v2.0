import React from "react";
import Post from "./Post";

const Posts: React.FC = () => {
  const posts = [
    {
      id: "123",
      username: "saeed",
      userImg: "https://links.papareact.com/3ke",
      caption: "this is  a caption go damn it!",
    },
    {
      id: "1232",
      username: "saeed",
      userImg: "https://links.papareact.com/3ke",
      caption: "this is  a caption go damn it!",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          img={post.userImg}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
