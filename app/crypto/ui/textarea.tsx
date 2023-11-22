import { Dispatch, SetStateAction } from "react";

export default function TextArea({setText, text}:{setText?:Dispatch<SetStateAction<string>>, text?: string}){
    return(
        <textarea value={text} onChange={(e)=>{if(setText){setText(e.target.value)}}} className="w-[350px] h-[400px] p-2">

        </textarea>
    )
}