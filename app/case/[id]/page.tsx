import { Case, Item } from "@/app/lib/types";
import CaseSection from "@/app/ui/caseSection";
import { notFound } from "next/navigation";
import CaseItems from "./ui/caseItems";
import { FlexCol } from "@/app/utils/flex";
import CaseOpen from "./ui/caseOpen";
import Link from "next/link";
import { SuBaDB } from '../../lib/sb';

export default async function Page({ params }: { params: { id: string } }){
    const id = params.id;

    let db = SuBaDB()
    let _case: Case | [] = await db.getCase(id);
    let _items: Item[] = await db.getItemsFromCase(id);
    if(Array.isArray(_case)){
        notFound()
    }

    return(
        <CaseSection nameClasses="hidden" mt="mt-6">
            <FlexCol className="w-full mt-4 relative">
                <Link className="mb-6 ml-2 mr-auto p-2 border-[2px] border-[#212225] hover:border-[#43484E] transition-colors duration-500" href="/">Назад к кейсам</Link>
                <span className="mb-10 text-[24px] relative z-40 border-b-[2px]">{_case.name.toUpperCase()}</span>
                <CaseOpen _case={_case} price={_case.price} items={_items}/>
                <CaseItems items={_items}/>
            </FlexCol>
        </CaseSection>
    )
}