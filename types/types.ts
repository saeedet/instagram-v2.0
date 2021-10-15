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
  address?: string;
}
export interface Data {
  expires: string;
  user: User;
}
export interface UserSession {
  status: string;
  data: Session;
}

export interface Post {
  caption: string;
  image: string;
  profileImg: string;
  timestamp: string;
  username: string;
}
