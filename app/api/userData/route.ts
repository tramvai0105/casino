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
  let { id }: { id: string } = await request.json()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
    db: { schema: "next_auth" },
    global: { headers: { "X-Client-Info": "@auth/supabase-adapter" } },
  })
  
  const { data, error } = 
  await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()
  if(data){
    return Response.json(data);
  }
  return Response.error()
}