import { Case, Item } from "../lib/types";
import CaseSection from "../ui/caseSection";
import Spacer from "../ui/spacer";
import { FlexCol } from "../utils/flex";
import { useState } from 'react';
import fs from 'fs';
import ItemElement from '../ui/item';
import { AddCaseForm, AddItemForm, AddItemsToCaseForm, ChangCaseForm, ChangItemForm, RemoveCaseForm, RemoveItemForm } from "./ui/itemmenu";
import CaseElement from "../ui/case";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";
import {SuBaDB} from "../lib/sb";

export default async function Page(){

    const db = SuBaDB(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);
    const session = await getServerSession()
    if(!session || !session.user || !session.user.name){
        redirect("/");
    }
    if(session.user.name.toLocaleLowerCase() != "голоса лосей"){
        redirect("/");
    }

    let items : Item[] = await db.getItems()
    let cases: Case[] = await db.getCases()
    
    return(
        <FlexCol className='w-full'>
            <CaseSection name="Управление предметами" className="gap-5 px-[5%]" mt="mt-[60px]">
                <AddItemForm/>
                <ChangItemForm items={items}/>
                <RemoveItemForm items={items}/>
            </CaseSection>
            <CaseSection name="Лист предметов" className="gap-5 px-[5%]" mt="mt-[60px]">
                {items.map((item, i)=>
                <ItemElement
                key={i}
                id={item.itemId} 
                name={item.name}
                image={item.image}
                price={item.price}
                describe={item.describe}
                rarity={item.rarity}
                />)}
            </CaseSection>
            <CaseSection name="Управление кейсами" className="gap-5 px-[5%]" mt="mt-[60px]">
                <AddCaseForm/>
                <ChangCaseForm cases={cases}/>
                <RemoveCaseForm cases={cases}/>
            </CaseSection>
            <CaseSection name="Лист кейсов" className="gap-5 px-[5%]" mt="mt-[60px]">
                {cases.map((item, i)=>
                <CaseElement
                key={i}
                id={item.caseId} 
                name={item.name}
                image={item.image}
                price={item.price}
                describe={item.describe}
                />)}
            </CaseSection>
            <CaseSection name="Добавить предметы в кейс" className="gap-5 px-[5%]" mt="mt-[60px]">
                <AddItemsToCaseForm items={items} cases={cases}/>
            </CaseSection>
            <Spacer size={80}/>
        </FlexCol>
    )
}