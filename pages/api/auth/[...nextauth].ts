import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  // default login
  //   theme: {
  //       logo: "//url",
  //       brandColor: "#sfsdf",
  //       colorScheme: "auto"
  //   }
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }: any): Promise<any> {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },
});
