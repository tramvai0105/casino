"use client"

import Image from 'next/image';
import { FlexCol } from '../utils/flex';
export default function ItemElement({id, name, image, price, describe}:{id: string,name: string,image: string, price: number, describe: string}){
    
    
    return(
        <div className='relative h-fit w-[180px]'>
            <FlexCol className='from-[#304384] to-[#141726] bg-gradient-to-b rounded-xl p-1
            before:-translate-y-[100%] 
            before:w-[80%] 
            before:h-[4px] 
            before:bg-[#3E63DD]
            before:rounded-lg
            '>
                <span className='px-2 text-[18px] text-center'>{(name.length > 12)? `${name.toLocaleUpperCase().slice(0, 12)}...`:`${name.toLocaleUpperCase().slice(0, 12)}`}</span>
                <Image className='max-h-[150px] p-1 w-auto max-w-[170px]' width={170} height={150} src={`/${image}`} alt={`${name}'s image`}/>
            </FlexCol>
            <FlexCol className='h-full opacity-0 hover:opacity-100 transition-opacity duration-300 pt-6 gap-3 -translate-y-[100%] w-full absolute bg-[#141726] bg-opacity-90'>
            <span className='px-2 text-[18px] text-center'>{name}</span>
                <span>Цена: {price}</span>
                <span className='text-center'>{describe}</span>
            </FlexCol>
        </div>
    )
}