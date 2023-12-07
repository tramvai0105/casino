import { Case, Item } from "@/app/lib/types";
import fs from 'fs';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export async function GET(request: Request) {

  let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));
  return Response.json(store.items[getRandomInt(0, 2)])
}