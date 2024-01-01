import { Case, Item } from "@/app/lib/types";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs';
import { SuBaDB } from '../../lib/sb';

export async function POST(request: Request) {
    let { items }: { items: string[] } = await request.json()
    const db = SuBaDB();
    const data: Item[] | null = await db.SetOfItems(items);
    if (data) {
        let iArray : Item[] = [];
        let map = new Map(data.map(i=> [i.itemId, i]))
        for(let i = 0; i < items.length; i++){
            let item = map.get(items[i])
            if(item)
            iArray.push(item)
        }
        return Response.json(iArray);
    }
    return Response.error()
}