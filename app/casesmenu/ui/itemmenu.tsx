"use client"

import { FlexCol, FlexRow } from "@/app/utils/flex";
import {addItem, removeItem, addCase, removeCase, changeItem, changeCase} from "@/app/casesmenu/lib/menuactions";
import { Case, Item } from "@/app/lib/types";
import { useFormState } from "react-dom";
import { useState } from "react";

export function AddItemForm(){

    const [state, dispatch] = useFormState(addItem, {message: " "});

    return(
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Добавить предмет</span>
                <input name="name" className="p-1 text-black" placeholder="Name" type="text"/>
                <input name="price" className="p-1 text-black" placeholder="Price" type="text"/>
                <input name="describe" className="p-1 text-black" placeholder="Description" type="text"/>
                <input name="file" className="p-2" type="file"/>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Загрузить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function AddCaseForm(){
    const [state, dispatch] = useFormState(addCase, {message: " "});

    return(
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Добавить кейс</span>
                <input name="name" className="p-1 text-black" placeholder="Name" type="text"/>
                <input name="price" className="p-1 text-black" placeholder="Price" type="text"/>
                <input name="describe" className="p-1 text-black" placeholder="Description" type="text"/>
                <input name="file" className="p-2" type="file"/>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Загрузить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function ChangItemForm({items}:{items: Item[]}){

    const [state, dispatch] = useFormState(changeItem, {message: " "});
    const [choosen, setChoosen] = useState<Item | null>(null);

    return(
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Изменить предмет</span>
                <select onChange={(e)=>setChoosen(items.filter(item=>item.itemId == e.target.value)[0])} name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {items.map((item,i)=><option key={i} value={item.itemId}>{item.name}</option>)}
                </select>
                <input value={choosen?.itemId} className="hidden" name="id"/>
                <input onChange={(e)=>setChoosen(choosen=>{if(choosen){return {...choosen, name: e.target.value}}else{return null}})} value={choosen?.name} name="name" className="p-1 text-black" placeholder="Name" type="text"/>
                
                <input onChange={(e)=>setChoosen(choosen=>{if(choosen){return {...choosen, price: Number(e.target.value)}}else{return null}})} value={choosen?.price} name="price" className="p-1 text-black" placeholder="Price" type="text"/>
                <input onChange={(e)=>setChoosen(choosen=>{if(choosen){return {...choosen, describe: e.target.value}}else{return null}})} value={choosen?.describe} name="describe" className="p-1 text-black" placeholder="Description" type="text"/>
                <input name="file" className="p-2" type="file"/>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Изменить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function ChangCaseForm({cases}:{cases: Case[]}){

    const [state, dispatch] = useFormState(changeCase, {message: " "});
    const [choosen, setChoosen] = useState<Case | null>(null);

    return(
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Изменить кейс</span>
                <select onChange={(e)=>setChoosen(cases.filter(item=>item.caseId == e.target.value)[0])} name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {cases.map((item,i)=><option key={i} value={item.caseId}>{item.name}</option>)}
                </select>
                <input value={choosen?.caseId} className="hidden" name="id"/>
                <input onChange={(e)=>setChoosen(choosen=>{if(choosen){return {...choosen, name: e.target.value}}else{return null}})} value={choosen?.name} name="name" className="p-1 text-black" placeholder="Name" type="text"/>
                
                <input onChange={(e)=>setChoosen(choosen=>{if(choosen){return {...choosen, price: Number(e.target.value)}}else{return null}})} value={choosen?.price} name="price" className="p-1 text-black" placeholder="Price" type="text"/>
                <input onChange={(e)=>setChoosen(choosen=>{if(choosen){return {...choosen, describe: e.target.value}}else{return null}})} value={choosen?.describe} name="describe" className="p-1 text-black" placeholder="Description" type="text"/>
                <input name="file" className="p-2" type="file"/>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Изменить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function RemoveItemForm({items}:{items: Item[]}){
    const [state, dispatch] = useFormState(removeItem, {message: " "});

    return(
        <form action={dispatch}>
            <FlexCol className="gap-10 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Удалить предмет</span>
                <select name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {items.map((item,i)=><option key={i} value={item.itemId}>{item.name}</option>)}
                </select>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Удалить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function RemoveCaseForm({cases}:{cases: Case[]}){
    const [state, dispatch] = useFormState(removeCase, {message: "  "});

    return(
        <form action={dispatch}>
            <FlexCol className="gap-10 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Удалить кейс</span>
                <select name="items" className="text-black px-4">
                    <option>---выберите кейс---</option>
                    {cases.map((item,i)=><option key={i} value={item.caseId}>{item.name}</option>)}
                </select>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Удалить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}