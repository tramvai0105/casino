import { Session } from "next-auth";
import Image from "next/image";
import { FlexCol, FlexRow } from "../utils/flex";
import Link from "next/link";
import CasinoAdapter from '../lib/adapter';
import { supabase } from "../lib/initSupabase";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export default function HeaderAuth({ session }: {
    session: Session | null,
}) {
    const [money, setMoney] = useState(-1);

    useEffect(() => {
        if (session) {
            fetchMoney(session)
        }
    }, [session])

    async function fetchMoney(session: Session) {
        if (session.user.id) {
            let res = await fetch("/api/userData", {
                method: "POST",
                body: JSON.stringify({ id: session.user.id }),
            });
            let data = await res.json()
            if (data) {
                setMoney(data.money);
            }
        }
    }

    return (
        (session && session.user && session.user.name)
            ?
            <FlexRow className="gap-3 ml-auto flex h-full">
                <Link href={"/profile"}>
                <FlexRow className="bg-[#2E3135] p-2 gap-2 hover:bg-[#3A141E] transition-colors duration-500">
                    <span className="text-[18px]">{session.user.name}</span>
                    <span className="text-[16px]">{(money > -1) ? money : "......"} <span className="text-[#E93D82]">₴</span></span>
                </FlexRow>
                </Link>
                {(session.user.image) ? <Image className="rounded-full" width={40} height={40} src={session.user.image} alt="аватар" /> : <></>}
                <Link href={"/api/auth/signout"}><Image width={25} height={25} src="/exit.svg" alt="Выход" /></Link>
            </FlexRow>
            :
            <Link className="ml-auto" href={"/api/auth/signin"}><button className="bg-[#0077FF] py-1 px-3 rounded-lg">Войти</button></Link>
    )
}