"use client"
import CaseSection from "@/app/ui/caseSection";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { FlexCol } from "../utils/flex";
import ProfileInfo from "./ui/profileInfo";
import UserItems from "./ui/userItems";
import { useEffect, useState } from "react";
import { DefaultUser, Session } from "next-auth";
import { Item } from "../lib/types";

interface User extends DefaultUser{
    items: string[],
    money: number,
} 

export default function Page(){
    const session = useSession()
    const [userData, setUserData] = useState<User | null>(null)
    const [userItems, setUserItems] = useState<Item[] | []>([])

    useEffect(()=>{
        if(session.data){
            fetchUser(session.data)
        }
    },[session])

    async function fetchUser(session: Session){
        if(session.user.id){
            let res = await fetch("/api/userData", {
                method: "POST",
                body: JSON.stringify({id: session.user.id}),
            });
            let data : User = await res.json()
            if(data){
                setUserData(data);
                fetchUserItems(data.items);
            }
        }
    }

    async function fetchUserItems(items: string[]){
        if(items.length > 0){
            let res = await fetch("/api/items", {
                method: "POST",
                body: JSON.stringify({items: items}),
            });
            let data : Item[] = await res.json()
            if(data){
                setUserItems(data);
            }
        }
    }

    return(
        <CaseSection nameClasses="hidden" mt="mt-14">
            <FlexCol className="w-full gap-6 mt-4 relative">
                <Link className="ml-2 mr-auto p-2 border-[2px] border-[#212225] hover:border-[#43484E] transition-colors duration-500" href="/">Назад к кейсам</Link>
                <ProfileInfo session={session.data}/>
                <UserItems items={userItems}/>
            </FlexCol>
        </CaseSection>
    )
}