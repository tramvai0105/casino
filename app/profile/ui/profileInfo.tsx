import { FlexCol, FlexRow } from "@/app/utils/flex";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import key from "@/public/key.svg"
import Link from "next/link";

export default function ProfileInfo({session}:{session: Session | null}){
    const [money, setMoney] = useState(-1);
    const [opened, setOpened] = useState(-1);

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
                setOpened(data.opened);
            }
        }
    }

    return(
        <div className="ml-4 flex justify-start p-2 w-full border-[2px] border-[#212225]">
        <FlexCol itemsCenter={false}>
            <FlexRow className="gap-3 p-2">
                {(session && session.user)
                ?  
                    <>
                    {(session.user.image)?<Image className="rounded-2xl" src={session.user.image} alt="user img" width={50} height={50}/>:<></>}
                    <FlexCol>
                        <span className="text-[20px]">{session.user.name}</span>
                        <span className="text-[16px]">Баланс: {(money > -1) ? money : "..."} <span className="text-[#E93D82]">₴</span></span>
                    </FlexCol>
                    <a className="bg-[#E5484D] border-[#E5484D] border-[2px] hover:border-white transition-all py-1 px-2 rounded-lg ml-2" target="_blank" href={"https://vk.com/fortheknowerisenough"}>Пополнить</a>
                    </>
                :
                <></>
                }
            </FlexRow>
            <FlexRow className="mt-2 p-2 gap-2">
                <Image className="border-[#873356] border-[3px] p-1 rounded-xl" src={key} height={40} width={40} alt="key"/>
                <span>Кейсов открыто: {(opened > -1) ? opened : ".."}</span>
            </FlexRow>
        </FlexCol>
        </div>
    )
}