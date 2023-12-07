import { Case, Item } from "@/app/lib/types";
import CaseElement from "@/app/ui/case";
import CaseSection from "@/app/ui/caseSection";
import ItemElement from "@/app/ui/item";
import fs from 'fs';
import { notFound } from "next/navigation";
import CaseItems from "./ui/caseItems";
import { FlexCol } from "@/app/utils/flex";
import CaseOpen from "./ui/caseOpen";

export default function Page({ params }: { params: { id: string } }){
    const id = params.id;
    
    let store : {items: Item[], cases: Case[]} = JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/store.json", 'utf8'));

    if(!store.cases.some(c=> c.caseId == id)){
        notFound()
    }

    let _case: Case = store.cases.filter(c=>c.caseId == id)[0];
    let _items: Item[] = store.items.filter(item=>(_case.items?.some(i=> i.id == item.itemId)?item:false))

    return(
        <CaseSection nameClasses="hidden" mt="mt-6">
            <FlexCol className="w-full mt-10">
                <CaseOpen items={_items}/>
                <CaseItems items={_items}/>
            </FlexCol>
        </CaseSection>
    )
}