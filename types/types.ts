import { Session } from "next-auth/server/types";

export interface Member {
  avatar: string;
  email: string;
  id: number;
  name: string;
  username: string;
}

export interface User {
  image: string;
  name: string;
  uid: string;
  username: string;
}

export interface UserSession {
  status: string;
  data: Session | null;
}

export interface Post {
  caption: string;
  image: string;
  profileImg: string;
  timestamp: string;
  username: string;
}

export interface Comment {
  comment: string;
  username: string;
  userImage: string;
  timestamp: string;
}
