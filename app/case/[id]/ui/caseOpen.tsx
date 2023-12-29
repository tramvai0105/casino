"use client"
import { Item } from "@/app/lib/types";
import CaseElement from "@/app/ui/case";
import ItemElement from "@/app/ui/item";
import { FlexCol, FlexRow } from "@/app/utils/flex";
import { easeOutQuart } from "js-easing-functions";
import { resolve } from "path";
import { useRef, useEffect, useState } from 'react';
import { Case } from '../../../lib/types';
import Image from 'next/image';
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { SuBaDB } from "@/app/lib/sb";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export default function CaseOpen({ items, _case, price }: { items: Item[], _case: Case, price: number }) {
    const { data: session, status } = useSession()
    const [openItems, setOpenItems] = useState<Item[]>();
    const [prize, setPrize] = useState<Item | null>(null);
    const [showPrize, setShowPrize] = useState(false);
    const [animation, setAnimation] = useState<boolean>(false);
    const [showCase, setShowCase] = useState(true);
    const canOpen = useRef(true)
    const opened = useRef<boolean>(false);
    
    useEffect(() => {
        UpdateOpenItems();
    }, [])

    function UpdateOpenItems(){
        let _items: Item[] = []
        for (let i = 0; i < 50; i++) {
            _items.push(items[getRandomInt(0, items.length)])
        }
        setOpenItems(_items)
    }

    useEffect(() => {
        //openItems тут чтобы гарантировать запуск анимации ПОСЛЕ смены ленты предметов
        // opened для того, чтобы избежать анимации на начальном рендере страницы
        if(opened.current){
            canOpen.current = false;
            animate()
        }
    }, [openItems, animation])

    const animateRef = useRef<HTMLDivElement>(null);
    const duration = 7000;
    const startValue = 0;
    const spinOffset = useRef(0);

    let startTime: number;

    function tick() {
        const elapsed = Date.now() - startTime;
        if (!animateRef.current) {
            return;
        }
        
        animateRef.current.scrollLeft = easeOutQuart(elapsed, startValue, 170 * 32 - animateRef.current.clientWidth / 2 + 150 + spinOffset.current, duration);

        if (elapsed < duration) {
            requestAnimationFrame(tick);
        }else{
            setShowPrize(true)
            canOpen.current = true;
        }
    }

    function animate() {
        startTime = Date.now();
        spinOffset.current = getRandomInt(-68, 68);
        //getRandomInt(-30, 30)
        tick();
    }

    async function openCase() {
        if(!canOpen.current){
            console.log("cannot");
            
            return;
        }
        if (openItems && session) {
            console.log(session);
            
            let res = await fetch("/api/open", {
                method: "POST",
                body: JSON.stringify({id: session.user.id, caseId: _case.caseId}),
            });
            let body = await res.json();
            UpdateOpenItems();
            setPrize(body)
            setShowCase(false);
            opened.current = true;
            setOpenItems(openItems => {
                let _items = openItems;
                if (_items) {
                    _items[32] = body
                    return _items
                }
                return undefined;
            })
            setAnimation(animation => !animation);
        }
    }

    return (
        <div className="h-fit w-full relative flex items-center flex-col">
            {showCase ?
                <>
                    <FlexCol className="absolute z-30">
                        <Image className='h-[320px] -translate-y-[25%] p-8 w-[340px]' width={200} height={180} src={`/${_case.image}`} alt={`${_case.name}'s image`}/>
                    </FlexCol>
                    <div style={{background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)"}} className="flex absolute w-full h-[230px] opacity-80 -translate-y-[20px] z-[25]"></div>
                </> 
                : <></>}
            {
                (showPrize && prize) ?
                <FlexCol className="absolute shadow-xl shadow-[#191919] gap-6 bg-[#191919] border-[2px] border-[#6D2545] z-50 p-14 -translate-y-[90px] rounded-lg">
                    <span className="text-[24px]">Вы выйграли <span className="font-bold">{prize.name.toLocaleLowerCase()}</span> за <span className="font-bold">{prize.price}</span> хрюков!</span>
                    <Image className={clsx({'from-[#304384]':(prize.rarity == "common" || prize.rarity == null), 'from-[#6D2545]':(prize.rarity == "rare"), 'from-[#8F6424]':(prize.rarity == "legend")},
                    'max-h-[200px] rounded-lg bg-gradient-to-b p-1 w-auto max-w-[220px]')} width={220} height={200} src={`/${prize.image}`} alt={`${prize.name}'s image`} />
                    <span className="text-[20px]">Цена: <span className="italic">{prize.price}</span></span>
                    <button className="mt-2 bg-[#E5484D] border-[#E5484D] border-[2px] hover:border-white transition-all px-14 py-4 text-[18px] relative font-bold rounded-sm z-40"
                    onClick={()=>setShowPrize(false)}>КРУТО</button>
                </FlexCol>
                :<></>
            }
            <div style={{ background: "linear-gradient(0deg, rgba(229,70,102,0.4010854341736695) 0%, rgba(229,70,102,1) 50%, rgba(229,70,102,0.3982843137254902) 100%)" }} className="h-[230px] rounded-full -translate-y-[20px] right-[100%] translate-x-[100%] w-[1px] absolute z-20"></div>
            <div style={{ background: "linear-gradient(0deg, rgba(229,70,102,0.4010854341736695) 0%, rgba(229,70,102,1) 50%, rgba(229,70,102,0.3982843137254902) 100%)" }} className="h-[230px] -translate-y-[20px] left-[100%] -translate-x-[100%] w-[1px] absolute z-20"></div>
            <div className="h-[230px] -translate-y-[20px] right-[100%] translate-x-[100%] w-[220px] bg-gradient-to-r from-[#4E1325] opacity-60 absolute z-10"></div>
            <div className="h-[230px] -translate-y-[20px] left-[100%] -translate-x-[100%] w-[220px] bg-gradient-to-l from-[#4E1325] opacity-60 absolute z-10"></div>
            <div className="absolute z-10 text-yellow-400 -translate-y-[20px] text-[22px] font-bold">V</div>
            <div className="absolute z-10 text-yellow-400 rotate-180 translate-y-[170px] text-[22px] font-bold">V</div>
            <div ref={animateRef} className="flex flex-row w-full min-h-[190px] mx-[10px] gap-1 overflow-y-hidden overflow-x-hidden">
                {(openItems) ? openItems.map((item, i) => <ItemElement
                    key={i}
                    id={item.itemId}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    describe={item.describe}
                    rarity={item.rarity}
                    describeOn={false}
                    onClick={() => console.log(i)}
                />) : <></>}
            </div>
            <button className="mt-10 bg-[#E5484D] border-[#E5484D] border-[2px] hover:border-white transition-all px-14 py-4 text-[18px] relative font-bold rounded-sm z-40"
                onClick={openCase}>ОТКРЫТЬ КЕЙС ЗА {price}</button>
        </div>
    )
}