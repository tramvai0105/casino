"use server"

import { File } from 'buffer';
import fs from 'fs';
import uniqid from 'uniqid';
import path from 'path';
import { date, z } from 'zod';
import { Case, Item } from '@/app/lib/types';
import { revalidatePath } from 'next/cache';
import { SuBaDB } from '@/app/lib/sb';

const itemSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    describe: z.string(),
    rarity: z.string().min(1),
    id: z.string().min(1),
})

const caseSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive(),
    describe: z.string(),
    id: z.string().min(1),
})

let db = SuBaDB(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);

export async function addItem(state: { message: string; } | undefined, formData: FormData) {
    const file: File | null = formData.get('file') as unknown as File
    let id = uniqid()
    if (!file) {
        return {
            message: 'Файл недоступен',
        };
    }

    const validData = itemSchema.safeParse({
        name: formData.get("name"),
        price: Number(formData.get("price")),
        describe: formData.get("describe"),
        rarity: formData.get("rarity"),
        id: id,
    })

    if (!validData.success) {
        return {
            message: "Неправильные данные",
        };
    }
    if (file.type != "image/png") {
        return {
            message: "Неправильный формат файла",
        };
    }
    let { name, price, describe, rarity } = validData.data;
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    if (rarity != "legend" && rarity != "rare") {
        rarity = "common"
    }
    fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    let item = {
        itemId: `${id}`,
        name: name,
        price: price,
        image: `${id}.png`,
        describe: describe,
        rarity: rarity,
    }
    await db.addItem(item);
    revalidatePath("/casesmenu")
}

export async function changeItem(state: { message: string; } | undefined, formData: FormData) {
    let file: File | null = formData.get('file') as unknown as File
    const validData = itemSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe"),
        rarity: formData.get("rarity"),
        id: formData.get("id")
    })
    if (!validData.success) {
        return {
            message: "Неправильные данные",
        };
    }

    if (file.size > 0 && file.type != "image/png") {
        return {
            message: "Неправильный формат файла",
        };
    } else if (file.size == 0) {
        file = null;
    }
    let { id, name, price, describe, rarity } = validData.data;
    if (rarity != "legend" && rarity != "rare") {
        rarity = "common"
    }
    let bytes: ArrayBuffer;
    let buffer: Buffer;

    let item = await db.getItem(id);
    if (!item) {
        return {
            message: "Ошибка, предмет не найден",
        };
    }
    if (file) {
        bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes)
        fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
        fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    }
    let _item = {
        itemId: id,
        name: name,
        price: price,
        image: item.image,
        describe: describe,
        rarity: rarity,
    }
    await db.updateItem(_item);
    revalidatePath("/casesmenu")
}

export async function addCase(state: { message: string; } | undefined, formData: FormData) {
    const file: File | null = formData.get('file') as unknown as File
    if (!file) {
        return {
            message: 'Файл недоступен',
        };
    }
    let id = uniqid()
    const validData = caseSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe"),
        id: id,
    })

    if (!validData.success) {
        return {
            message: "Неправильные данные",
        };
    }
    if (file.type != "image/png") {
        return {
            message: "Неправильный формат файла",
        };
    }
    const { name, price, describe } = validData.data;
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    let _case = {
        caseId: `${id}`,
        name: name,
        price: price,
        image: `${id}.png`,
        describe: describe,
    }
    await db.addCase(_case);
    revalidatePath("/casesmenu")
}

export async function changeCase(state: { message: string; } | undefined, formData: FormData) {
    let file: File | null = formData.get('file') as unknown as File
    const validData = caseSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        describe: formData.get("describe"),
        id: formData.get("id")
    })
    if (!validData.success) {
        return {
            message: "Неправильные данные",
        };
    }

    if (file.size > 0 && file.type != "image/png") {
        return {
            message: "Неправильный формат файла",
        };
    } else if (file.size == 0) {
        file = null;
    }
    const { id, name, price, describe } = validData.data;

    let bytes: ArrayBuffer;
    let buffer: Buffer;

    let _case = await db.getCase(id);
    if (_case == null) {
        return {
            message: "Ошибка, кейс не найден",
        };
    }
    if (file) {
        bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes)
        fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
        fs.writeFileSync(path.resolve(process.cwd() + "/public" + `/${id}.png`), buffer)
    }
    let __case = {
        caseId: id,
        name: name,
        price: price,
        image: _case.image,
        describe: describe,
    }
    await db.updateCase(__case)
    revalidatePath("/casesmenu")
}

export async function removeItem(state: { message: string; } | undefined, formData: FormData) {
    let id: string | null = formData.get("items") as string;
    if (!id || id == "---выберите предмет---") {
        return {
            message: "Не выбран предмет",
        };
    }
    let item = await db.getItem(id);
    if (!item) {
        return {
            message: "Ошибка, предмет не найден",
        };
    }
    await db.deleteItem(id);
    fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
    revalidatePath("/casesmenu")
}

export async function removeCase(state: { message: string; } | undefined, formData: FormData) {
    let id: string | null = formData.get("items") as string;

    if (!id || id == "---выберите кейс---") {
        return {
            message: "Не выбран кейс",
        };
    }
    let _case = await db.getCase(id);
    if (_case == null) {
        return {
            message: "Ошибка, кейс не найден",
        };
    }
    await db.deleteCase(id);
    fs.unlinkSync(path.resolve(process.cwd() + "/public" + `/${id}.png`))
    revalidatePath("/casesmenu")
}

export async function AddItemsToCase(state: { message: string; } | undefined, formData: FormData) {
    let cases: Case[] = await db.getCases();
    let items: Item[] = await db.getCases();
    let _caseId: string | null = formData.get("cases") as unknown as string;
    let _itemId: string | null = formData.get("items") as unknown as string;
    if (!_caseId || !_itemId || _caseId == "---выберите кейс---" || _itemId == "---выберите предмет---") {
        return {
            message: "Ошибка, кейс и/или предмет не задан",
        };
    }
    if (!cases.some(i => i.caseId == _caseId) && !items.some(i => i.itemId == _itemId)) {
        return {
            message: "Ошибка, кейс и/или предмет не найден",
        };
    }
    if (cases.filter(c => (c.items && c.items.some(i => i.id == _itemId) ? true : false)).length > 0) {
        return {
            message: "Предмет уже добавлен",
        };
    }
    await db.AddItemToCase(_caseId, _itemId);
    revalidatePath("/casesmenu")
}

export async function RemoveItemsToCase(state: { message: string; } | undefined, formData: FormData) {
    let cases: Case[] = await db.getCases();
    let items: Item[] = await db.getCases();
    let _caseId: string | null = formData.get("cases") as unknown as string;
    let _itemId: string | null = formData.get("items") as unknown as string;
    if (!_caseId || !_itemId || _caseId == "---кейс не выбран---" || _itemId == "---выберите предмет---") {
        return {
            message: "Ошибка, кейс и/или предмет не задан",
        };
    }
    if (!cases.some(i => i.caseId == _caseId) && !items.some(i => i.itemId == _itemId)) {
        return {
            message: "Ошибка, кейс и/или предмет не найден",
        };
    }
    await db.RemoveItemFromCase(_caseId, _itemId);
    revalidatePath("/casesmenu")
}