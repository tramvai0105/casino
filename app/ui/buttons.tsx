import Image from "next/image";
import React from "react";
import { FlexRow } from "../utils/flex";

export function HeaderButton({children, src, alt}:{
    children: React.ReactNode,
    src: string,
    alt: string,
    }){
    return(
        <button className="border-b-[2px] px-2 py-3 hover:border-[#E54666] hover:bg-[#3A141E] border-[#5A6169] transition-colors duration-500">
            <FlexRow className="gap-2 text-[15px]">
                <Image height={30} width={30} src={src} alt={alt}/>
                {children}
            </FlexRow>
        </button>
    )
}