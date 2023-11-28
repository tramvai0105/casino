import Image from "next/image";

export default function CaseSection({children, className, name, mt}:{children: React.ReactNode, className?: string, name?:string, mt?:string}){
    return(
        <div className={"w-full px-[10%] flex flex-col " + mt}>
            <div className="p-2 absolute text-[16px] -translate-y-[100%] border-[#5A6169] border-b-[2px]">{name}</div>
            <div className="w-full">
                <div className={"flex flex-wrap w-full p-4 min-h-[150px] bg-[#191919] " + className}>
                    {children}
                </div>
            </div>
        </div>
    )
}