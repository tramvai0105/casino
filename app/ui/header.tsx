import pigLogo from "@/public/piglogo.png"
import Image from "next/image";
import Link from "next/link";
import { FlexRow } from '../utils/flex';
import { HeaderButton } from './buttons';
import box from "@/public/box.svg"

export default function Header(){
    return(
        <header className="w-full h-fit fixed">
            <FlexRow
            className="bg-[#18191B] gap-1 px-[15%] w-full border-[#696e77] box-border"> 
                {/* <span className="text-[#FF949D] mr-1 text-[26px]">Gold</span>
                <span className="text-[#FF949D] text-[26px]">P.</span> */}
                <Image src={pigLogo} alt="logo" height={50} width={50}/>
                <Link className="ml-10" href={"./"}>
                    <HeaderButton src={box} alt="box">КЕЙСЫ</HeaderButton>
                </Link>
            </FlexRow>
        </header>
    )
}