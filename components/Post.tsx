import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db } from "../Firebase/firebase";
import Moment from "react-moment";
import { UserSession } from "../types/types";

interface Props {
  id: string;
  username: string;
  img: string;
  userImage: string;
  caption: string;
}

const Post: React.FC<Props> = ({ id, username, img, caption, userImage }) => {
  const { data: session }: UserSession = useSession();
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<
    [] | QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setHasLiked(
        likes.findIndex((like) => like.id === session.user.uid) !== -1
      );
    }
  }, [likes, session]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),

    [id, db]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),

    [id, db]
  );

  const sendComment = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    if (session) {
      event.preventDefault();
      const commentToSend: string = comment;
      setComment("");

      await addDoc(collection(db, "posts", id, "comments"), {
        comment: commentToSend,
        username: session.user.username,
        userImage: session.user.image,
        timestamp: serverTimestamp(),
      });
    }
  };

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    }
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImage}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold ">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}
      <img src={img} alt="" className="w-full object-contain" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-[62deg] mt-[-2px]" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <span className="font-bold mb-1 block">{likes.length} likes</span>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <form className="flex items-center p-4" onSubmit={sendComment}>
          <EmojiHappyIcon className="h-7 cursor-pointer" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none px-2"
          />
          <button
            onClick={sendComment}
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400 disabled:cursor-default"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
