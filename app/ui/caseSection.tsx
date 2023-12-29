import Image from "next/image";

export default function CaseSection({children, className, nameClasses, name, mt}:{children: React.ReactNode, className?: string, nameClasses?: string, name?:string, mt?:string}){
    return(
        <div className={"w-full px-[10%] flex flex-col " + mt}>
            <div className={"pb-1 absolute text-[16px] -translate-y-[100%] " + nameClasses}><span className="from-[#304384] to-[#182449] bg-gradient-to-r px-5 py-1">{name}</span></div>
            <div className="w-full">
                <div className={"flex flex-wrap w-full p-4 min-h-[150px] bg-[#191919] " + className}>
                    {children}
                </div>
            </div>
        </div>
    )
}