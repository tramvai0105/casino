import { Item } from "@/app/lib/types";
import ItemElement from "@/app/ui/item";
import { FlexCol } from '../../../utils/flex';

export default function CaseItems({items}:{items: Item[]}){
    return(
    <FlexCol className="mt-12 w-full">
        <span className="text-[20px]">Содержимое кейса</span>
        <div className="flex p-6 flex-wrap gap-6 w-full">
            {items.map((item, i)=>
                <ItemElement key={i} id={item.itemId} name={item.name} image={item.image} price={item.price} describe={item.describe} rarity={item.rarity}/>
                )}
        </div>   
    </FlexCol>
    )
}