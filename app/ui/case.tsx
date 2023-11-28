"use client"

import Image from 'next/image';
import { FlexCol } from '../utils/flex';
export default function CaseElement({id, name, image, price, describe}:{id: string,name: string,image: string, price: number, describe: string}){
    
    
    return(
        <div className='relative h-fit w-[180px]'>
            <FlexCol className='justify-center cursor-pointer rounded-xl p-1 min-h-[240px] case-element'>
                <Image className='max-h-[180px] transition-transform move-box duration-700 p-1 w-auto max-w-[200px]' width={200} height={180} src={`/${image}`} alt={`${name}'s image`}/>
                <span className='px-2 text-[18px]'>{name}</span>
                <span className='px-4 mt-1 py-2 text-[#E5484D] paint-button rounded-lg bg-[#43484E] font-bold'>{price}</span>
            </FlexCol>
        </div>
    )
}