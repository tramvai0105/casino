import { Session } from "next-auth";
import Image from "next/image";
import { FlexRow } from "../utils/flex";
import Link from "next/link";

export default function HeaderAuth({session}:{
    session: Session | null
}){
    return(
        (session && session.user && session.user.name)
        ?
        <FlexRow className="gap-3 ml-auto">
            {(session.user.image)?<Image className="rounded-full" width={40} height={40} src={session.user.image} alt="аватар"/>:<></>}
            <span>{session.user.name}</span>
        </FlexRow>
        :
        <Link className="ml-auto" href={"/api/auth/signin"}><button className="bg-[#0077FF] p-3 rounded-lg">Войти</button></Link>
    )
}