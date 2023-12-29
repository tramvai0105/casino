import { Case, Item } from "@/app/lib/types";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs';
import { SuBaDB } from '../../lib/sb';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export async function POST(request: Request) {
  let { id, caseId }: { id: string, caseId: string } = await request.json()
  const db = await SuBaDB();
  const _case = await db.getCase(caseId);
  const items: Item[] = await db.getItemsFromCase(caseId);
  if(items == undefined){
    return Response.error()
  }
  let item = items[getRandomInt(0, items.length)]
  console.log("ID: ", id);
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
    db: { schema: "next_auth" },
    global: { headers: { "X-Client-Info": "@auth/supabase-adapter" } },
  })
  
  const { data, error }: {data: {id: string, name: string, image: string, money: number, items: string[]} | null, error: PostgrestResponseFailure} = 
  await supabase
    .from("users")
    .select()
    .eq("id", id)
    .maybeSingle()
  if(data){
    data.money -= _case.price;
    data.items.push(item.itemId);
    await supabase
      .from("users")
      .update({
        ...data,
      })
      .eq("id", data.id)
      .select()
      .single()
    return Response.json(item);
  }
  return Response.error()
}