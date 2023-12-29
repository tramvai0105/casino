import { Session } from "next-auth";
import Image from "next/image";
import { FlexCol, FlexRow } from "../utils/flex";
import Link from "next/link";
import readDb from "../lib/utils";
import CasinoAdapter from '../lib/adapter';
import { supabase } from "../lib/initSupabase";
import { createClient } from "@supabase/supabase-js";

export default function HeaderAuth({ session }: {
    session: Session | null
}) {

    return (
        (session && session.user && session.user.name)
            ?
            <FlexRow className="gap-3 flex ml-auto h-full">
                <FlexRow className="bg-[#2E3135] p-2 gap-2">
                    <span className="text-[18px]">{session.user.name}</span>
                    <span className="text-[16px]">{session.user.money || "......"} <span className="text-[#E93D82]">₴</span></span>
                </FlexRow>
                {(session.user.image) ? <Image className="rounded-full" width={40} height={40} src={session.user.image} alt="аватар" /> : <></>}
                <Link href={"/api/auth/signout"}><Image width={25} height={25} src="/exit.svg" alt="Выход" /></Link>
            </FlexRow>
            :
            <Link className="ml-auto" href={"/api/auth/signin"}><button className="bg-[#0077FF] py-1 px-3 rounded-lg">Войти</button></Link>
    )
}