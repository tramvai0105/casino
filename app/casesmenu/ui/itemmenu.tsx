"use client"

import { FlexCol, FlexRow } from "@/app/utils/flex";
import { addItem, removeItem, addCase, removeCase, changeItem, changeCase, AddItemsToCase, RemoveItemsToCase } from "@/app/casesmenu/lib/menuactions";
import { Case, Item } from "@/app/lib/types";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import CaseElement from "@/app/ui/case";
import ItemElement from "@/app/ui/item";

export function AddItemForm() {

    const [state, dispatch] = useFormState(addItem, { message: " " });

    return (
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Добавить предмет</span>
                <input name="name" className="p-1 text-black" placeholder="Name" type="text" />
                <input name="price" className="p-1 text-black" placeholder="Price" type="text" />
                <input name="describe" className="p-1 text-black" placeholder="Description" type="text" />
                <select className="text-black" name="rarity">
                    <option className="text-blue-600" value="common">эта опция значит обычное</option>
                    <option className="text-purple-600" value="rare">редкое</option>
                    <option className="text-yellow-600" value="legend">легендарное</option>
                </select>
                <input name="file" className="p-2" type="file" />
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Загрузить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function AddCaseForm() {
    const [state, dispatch] = useFormState(addCase, { message: " " });

    return (
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Добавить кейс</span>
                <input name="name" className="p-1 text-black" placeholder="Name" type="text" />
                <input name="price" className="p-1 text-black" placeholder="Price" type="text" />
                <input name="describe" className="p-1 text-black" placeholder="Description" type="text" />
                <input name="file" className="p-2" type="file" />
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Загрузить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function ChangItemForm({ items }: { items: Item[] }) {

    const [state, dispatch] = useFormState(changeItem, { message: " " });
    const [choosen, setChoosen] = useState<Item | null>(null);

    return (
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Изменить предмет</span>
                <select onChange={(e) => setChoosen(items.filter(item => item.itemId == e.target.value)[0])} name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {items.map((item, i) => <option key={i} value={item.itemId}>{item.name}</option>)}
                </select>
                <input value={choosen?.itemId} className="hidden" name="id" />
                <input onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, name: e.target.value } } else { return null } })} value={choosen?.name} name="name" className="p-1 text-black" placeholder="Name" type="text" />

                <input onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, price: Number(e.target.value) } } else { return null } })} value={choosen?.price} name="price" className="p-1 text-black" placeholder="Price" type="text" />
                <input onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, describe: e.target.value } } else { return null } })} value={choosen?.describe} name="describe" className="p-1 text-black" placeholder="Description" type="text" />
                <select onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, rarity: e.target.value } } else { return null } })} value={choosen?.rarity} className="text-black" name="rarity">
                    <option className="text-blue-600" value="common">эта опция значит обычное</option>
                    <option className="text-purple-600" value="rare">редкое</option>
                    <option className="text-yellow-600" value="legend">легендарное</option>
                </select>
                <input name="file" className="p-2" type="file" />
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Изменить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function ChangCaseForm({ cases }: { cases: Case[] }) {

    const [state, dispatch] = useFormState(changeCase, { message: " " });
    const [choosen, setChoosen] = useState<Case | null>(null);

    return (
        <form action={dispatch}>
            <FlexCol className="gap-2 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Изменить кейс</span>
                <select onChange={(e) => setChoosen(cases.filter(item => item.caseId == e.target.value)[0])} name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {cases.map((item, i) => <option key={i} value={item.caseId}>{item.name}</option>)}
                </select>
                <input value={choosen?.caseId} className="hidden" name="id" />
                <input onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, name: e.target.value } } else { return null } })} value={choosen?.name} name="name" className="p-1 text-black" placeholder="Name" type="text" />

                <input onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, price: Number(e.target.value) } } else { return null } })} value={choosen?.price} name="price" className="p-1 text-black" placeholder="Price" type="text" />
                <input onChange={(e) => setChoosen(choosen => { if (choosen) { return { ...choosen, describe: e.target.value } } else { return null } })} value={choosen?.describe} name="describe" className="p-1 text-black" placeholder="Description" type="text" />
                <input name="file" className="p-2" type="file" />
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Изменить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function RemoveItemForm({ items }: { items: Item[] }) {
    const [state, dispatch] = useFormState(removeItem, { message: " " });

    return (
        <form action={dispatch}>
            <FlexCol className="gap-10 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Удалить предмет</span>
                <select name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {items.map((item, i) => <option key={i} value={item.itemId}>{item.name}</option>)}
                </select>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Удалить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function RemoveCaseForm({ cases }: { cases: Case[] }) {
    const [state, dispatch] = useFormState(removeCase, { message: "  " });


    return (
        <form action={dispatch}>
            <FlexCol className="gap-10 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Удалить кейс</span>
                <select name="items" className="text-black px-4">
                    <option>---выберите кейс---</option>
                    {cases.map((item, i) => <option key={i} value={item.caseId}>{item.name}</option>)}
                </select>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Удалить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}

export function AddItemsToCaseForm({ cases, items }: { cases: Case[]; items: Item[] }) {
    const [state, dispatch] = useFormState(AddItemsToCase, { message: "  " });
    const [choosenCase, setChoosenCase] = useState<Case | null>(null);
    // const [choosenItem, setChoosenItem] = useState<Case | null>(null);

    return (
        <FlexCol className="gap-5">
            <FlexRow className="gap-5 mr-auto">
                <form onSubmit={() => setChoosenCase(choosenCase => choosenCase)} action={dispatch}>
                    <FlexCol className="gap-10 bg-[#272A2D] px-3 py-6 rounded-2xl">
                        <span>Добавить предметы в кейс</span>
                        <select name="cases" onChange={(e) => setChoosenCase(cases.filter(item => item.caseId == e.target.value)[0])} className="text-black px-4">
                            <option>---выберите кейс---</option>
                            {cases.map((item, i) => <option key={i} value={item.caseId}>{item.name}</option>)}
                        </select>
                        <select name="items" className="text-black px-4">
                            <option>---выберите предмет---</option>
                            {items.map((item, i) => <option key={i} value={item.itemId}>{item.name}</option>)}
                        </select>
                        <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Добавить</button>
                        <span className="text-red-400">{state?.message}</span>
                    </FlexCol>
                </form>
                {choosenCase ?
                    <CaseElement
                        id={choosenCase.caseId}
                        name={choosenCase.name}
                        image={choosenCase.image}
                        price={choosenCase.price}
                        describe={choosenCase.describe}
                    />
                    : <></>}
                <RemoveItemsFromCase items={(choosenCase && choosenCase.items)?items.filter(item=>((choosenCase && choosenCase.items)?choosenCase.items.some(i=>i.id == item.itemId):false)):[]} _case={choosenCase}/>
            </FlexRow>
            <FlexRow className="gap-5 mr-auto">
                <div className="p-2 text-[24px] border-[#5A6169] border-y-[2px]">Предметы из кейса</div>
                {choosenCase && choosenCase.items
                    ? choosenCase.items.map((item, i) => {
                        let _item = items.filter(i => i.itemId == item.id)[0];
                        return <ItemElement
                            key={i}
                            id={_item.itemId}
                            name={_item.name}
                            image={_item.image}
                            price={_item.price}
                            describe={_item.describe}
                            rarity={_item.rarity}
                        />
                    })
                    : <></>}
            </FlexRow>
        </FlexCol>
    )
}

export function RemoveItemsFromCase({ _case, items }: { _case: Case | null; items: Item[] }) {
    const [state, dispatch] = useFormState(RemoveItemsToCase, { message: "  " });
    const [choosenCase, setChoosenCase] = useState<Case | null>(null);
    
    return (
        <form onSubmit={() => setChoosenCase(choosenCase => choosenCase)} action={dispatch}>
            <FlexCol className="gap-10 bg-[#272A2D] px-3 py-6 rounded-2xl">
                <span>Удалить предметы из кейса</span>
                <select name="cases" className="text-black px-4">
                    {_case?<option value={_case.caseId}>{_case.name}</option>:<option>---кейс не выбран---</option>}
                </select>
                <select name="items" className="text-black px-4">
                    <option>---выберите предмет---</option>
                    {items.map((item, i) => <option key={i} value={item.itemId}>{item.name}</option>)}
                </select>
                <button className="bg-[#43484E] p-2 rounded-xl" type="submit">Удалить</button>
                <span className="text-red-400">{state?.message}</span>
            </FlexCol>
        </form>
    )
}