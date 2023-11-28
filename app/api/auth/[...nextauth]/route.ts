import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import VKProvider from "next-auth/providers/vk";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        VKProvider({
            clientId: process.env.VK_ID ?? "",
            clientSecret: process.env.VK_SECRET ?? ""
        })
    ],
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}