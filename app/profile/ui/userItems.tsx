import { Item } from "@/app/lib/types";
import ItemElement from "@/app/ui/item";
import { FlexCol } from "@/app/utils/flex";

export default function UserItems({items}:{items: Item[]}){
    return(
    <FlexCol className="ml-2 w-fit px-5 pt-3 border-[2px] border-[#212225]">
        <span className="text-[20px] border-[#E54666] border-b-[2px] px-3 pb-2 mr-auto">Мои предметы</span>
        <div className="flex py-3 flex-wrap gap-6 w-full">
            {(items.length > 0) 
            ?
                <>
                {items.map((item, i)=>
                    <ItemElement key={i} id={item.itemId} name={item.name} image={item.image} price={item.price} describe={item.describe} rarity={item.rarity}/>
                    )}
                </>
            :  
                <>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div> 
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                    <div className="w-[168px] h-[189px] animate-pulse bg-[#363A3F] rounded-xl"></div>
                </>
            }
        </div>   
    </FlexCol>
    )
}