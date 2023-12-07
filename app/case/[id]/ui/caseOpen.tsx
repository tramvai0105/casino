"use client"
import { Item } from "@/app/lib/types";
import ItemElement from "@/app/ui/item";
import { FlexRow } from "@/app/utils/flex";
import { easeOutQuart } from "js-easing-functions";
import { resolve } from "path";
import { useRef, useEffect, useState } from 'react';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export default function CaseOpen({ items }: { items: Item[] }) {

    const [openItems, setOpenItems] = useState<Item[]>()
    const [animation, setAnimation] = useState<boolean>(false)
    const opened = useRef<boolean>(false)

    useEffect(()=>{
        let _items = items
        for (let i = 0; i < 50; i++) {
            _items.push(items[getRandomInt(0, 2)])
        }
        setOpenItems(_items)
    },[])

    useEffect(()=>{
        if(opened.current){
            animate()
        }
    },[openItems, animation])
    
    const animateRef = useRef<HTMLDivElement>(null);
    const duration = 7000;
    const startValue = 0;
    let spinOffset = 0;

    let startTime: number;

    function tick() {
        const elapsed = Date.now() - startTime;
        if(!animateRef.current){
            return;
        }
        animateRef.current.scrollLeft = easeOutQuart(elapsed, startValue, 170*32 - animateRef.current.clientWidth / 2 + 100 + spinOffset, duration);

        if (elapsed < duration) {
            requestAnimationFrame(tick);
        }
    }

    function animate() {
        startTime = Date.now();
        spinOffset = getRandomInt(-55, 65);
        tick();
    }

    async function openCase(){
        let res = await fetch("/api/open");
        let body = await res.json();
        console.log(body);
        if(openItems){
            opened.current = true;
            setOpenItems(openItems=>{
                let _items = openItems;
                if(_items){
                    _items[32] = body
                    return _items
                }
                return undefined;
            })
            setAnimation(animation=>!animation);
        }
    }

    return (
        <div className="h-fit w-full relative flex items-center flex-col">
            <div className="h-[190px] right-[100%] translate-x-[100%] w-[220px] bg-gradient-to-r from-[#4E1325] opacity-60 absolute z-10"></div>
            <div className="h-[190px] left-[100%] -translate-x-[100%] w-[220px] bg-gradient-to-l from-[#4E1325] opacity-60 absolute z-10"></div>
            <div ref={animateRef} className="flex flex-row w-full min-h-[190px] mx-[10px] gap-1 overflow-y-hidden overflow-x-hidden">
                {(openItems)?openItems.map((item, i) => <ItemElement
                    key={i}
                    id={item.itemId}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    describe={item.describe}
                    rarity={item.rarity}
                    describeOn={false}
                    onClick={()=>console.log(i)}
                />):<></>}
            </div>
            <button onClick={openCase}>Start</button>
        </div>
    )
}