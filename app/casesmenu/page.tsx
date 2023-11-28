import { Case, Item } from "../lib/types";
import CaseSection from "../ui/caseSection";
import Spacer from "../ui/spacer";
import { FlexCol } from "../utils/flex";
import { useState } from 'react';
import fs from 'fs';
import ItemElement from '../ui/item';
import { AddCaseForm, AddItemForm, ChangCaseForm, ChangItemForm, RemoveCaseForm, RemoveItemForm } from "./ui/itemmenu";
import CaseElement from "../ui/case";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";

export default async function Page(){

    const session = await getServerSession()

    if(!session){
        redirect("/")
    }

    let file : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    
    let cases: Case[] = file.cases;
    let items: Item[] = [...file.items];

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
            <Spacer size={80}/>
        </FlexCol>
    )
}