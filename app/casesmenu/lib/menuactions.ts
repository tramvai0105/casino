"use server"

import { File } from 'buffer';
import fs from 'fs';
import uniqid from 'uniqid';
import path from 'path';
import { date, z } from 'zod';
import { Case, Item } from '@/app/lib/types';
import { revalidatePath } from 'next/cache';

const itemSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    describe: z.string(),
    id: z.string().min(1),
})

const caseSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    describe: z.string(),
})

export async function addItem(state: { message: string; } | undefined, formData: FormData){
    const file: File | null = formData.get('file') as unknown as File
    if(!file){
        return {
            message: 'Файл недоступен',
          };
    }
    const validData = itemSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe")
    })
    if(!validData.success){
        return {
            message: "Неправильные данные",
          };
    }
    if(file.type != "image/png"){
        return {
            message: "Неправильный формат файла",
          };
    }
    const {name, price, describe} = validData.data;
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    let id = uniqid()

    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    store.items.push({
        itemId: `${id}`,
        name: name,
        price: price,
        image: `${id}.png`,
        describe: describe,
    })
    fs.writeFileSync(process.cwd() + "/app/lib/store.json", JSON.stringify(store))
    revalidatePath("/casesmenu")
}

export async function changeItem(state: { message: string; } | undefined, formData: FormData){
    let file: File | null = formData.get('file') as unknown as File
    const validData = itemSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe"),
        id: formData.get("id")
    })
    if(!validData.success){
        return {
            message: "Неправильные данные",
          };
    }
    
    if(file.size > 0 && file.type != "image/png"){
        return {
            message: "Неправильный формат файла",
          };
    }else if(file.size == 0){
        file = null;
    }
    const {id, name, price, describe} = validData.data;

    let bytes: ArrayBuffer;
    let buffer: Buffer;

    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    if(!store.items.some(item=>item.itemId == id)){
        return {
            message: "Ошибка, предмет не найден",
          };
    }
    if(file){
        bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes)
        fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
        fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    }
    store.items = store.items.map((item)=>{
        if(item.itemId == id){
            return({
                itemId: id,
                name: name,
                price: price,
                image: item.image,
                describe: describe,
            })
        }else{
            return item;
        }
    })
    fs.writeFileSync(process.cwd() + "/app/lib/store.json", JSON.stringify(store))
    revalidatePath("/casesmenu")
}

export async function addCase(state: { message: string; } | undefined, formData: FormData){
    const file: File | null = formData.get('file') as unknown as File
    if(!file){
        return {
            message: 'Файл недоступен',
          };
    }
    const validData = caseSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe")
    })
    if(!validData.success){
        return {
            message: "Неправильные данные",
          };
    }
    if(file.type != "image/png"){
        return {
            message: "Неправильный формат файла",
          };
    }
    const {name, price, describe} = validData.data;
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    let id = uniqid()

    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    store.cases.push({
        caseId: `${id}`,
        name: name,
        price: price,
        image: `${id}.png`,
        describe: describe,
    })
    fs.writeFileSync(process.cwd() + "/app/lib/store.json", JSON.stringify(store))
    revalidatePath("/casesmenu")
}

export async function changeCase(state: { message: string; } | undefined, formData: FormData){
    let file: File | null = formData.get('file') as unknown as File
    const validData = itemSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe"),
        id: formData.get("id")
    })
    if(!validData.success){
        return {
            message: "Неправильные данные",
          };
    }
    
    if(file.size > 0 && file.type != "image/png"){
        return {
            message: "Неправильный формат файла",
          };
    }else if(file.size == 0){
        file = null;
    }
    const {id, name, price, describe} = validData.data;

    let bytes: ArrayBuffer;
    let buffer: Buffer;

    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    if(!store.cases.some(item=>item.caseId == id)){
        return {
            message: "Ошибка, предмет не найден",
          };
    }
    if(file){
        bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes)
        fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
        fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    }
    store.cases = store.cases.map((item)=>{
        if(item.caseId == id){
            return({
                caseId: id,
                name: name,
                price: price,
                image: item.image,
                describe: describe,
            })
        }else{
            return item;
        }
    })
    fs.writeFileSync(process.cwd() + "/app/lib/store.json", JSON.stringify(store))
    revalidatePath("/casesmenu")
}

export async function removeItem(state: { message: string; } | undefined, formData: FormData){
    let id : string | null = formData.get("items") as string;
    console.log(id);
    
    if(!id || id=="---выберите предмет---"){
        return {
            message: "Не выбран предмет",
          };
    }
    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    
    if(!store.items.some(item=>item.itemId == id)){
        return {
            message: "Ошибка, предмет не найден",
          };
    }
    store.items = store.items.filter(item=> item.itemId != id);
    fs.writeFileSync(process.cwd() + "/app/lib/store.json", JSON.stringify(store))
    fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
    revalidatePath("/casesmenu")
}

export async function removeCase(state: { message: string; } | undefined, formData: FormData){
    let id : string | null = formData.get("items") as string;
    
    if(!id || id=="---выберите кейс---"){
        return {
            message: "Не выбран кейс",
          };
    }
    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
    
    if(!store.cases.some(item=> item.caseId == id)){
        return {
            message: "Ошибка, кейс не найден",
          };
    }
    store.cases = store.cases.filter(item=> item.caseId != id);
    fs.writeFileSync(process.cwd() + "/app/lib/store.json", JSON.stringify(store))
    fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
    revalidatePath("/casesmenu")
}