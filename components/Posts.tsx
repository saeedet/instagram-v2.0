import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import Post from "./Post";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>();
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImage={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
