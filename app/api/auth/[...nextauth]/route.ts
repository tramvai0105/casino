import NextAuth, { Account, ISODateString, Profile, Session, SessionOptions, SessionStrategy, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import VKProvider from "next-auth/providers/vk";
import type { Adapter, AdapterSession, AdapterAccount, AdapterUser } from "next-auth/adapters";
import jwt from "jsonwebtoken"
import { JWT } from "next-auth/jwt";
import { createClient } from "@supabase/supabase-js";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        VKProvider({
            clientId: process.env.VK_ID ?? "",
            clientSecret: process.env.VK_SECRET ?? ""
        })
    ],
    session: { strategy: "jwt", } as SessionOptions,
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    }),
    callbacks: {
        async session({ session, user, token }:{session: Session, user: User, token: JWT}) {
            const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
                db: { schema: "next_auth" },
                global: { headers: { "X-Client-Info": "@auth/supabase-adapter" } },
            })
            if(session.user){
                session.user.id = token.sub;
                const {data, error} = await supabase.from("users").select("money").eq("id", token.sub).maybeSingle()
                session.user.money = data?.money;
                }
            return Promise.resolve(session)
        },
    },
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

