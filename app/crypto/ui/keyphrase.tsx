import { Dispatch, SetStateAction } from "react";
import { FlexRow } from "../../utils/flex";

export default function KeyPhrase({setText}:{setText:Dispatch<SetStateAction<string>>}){
    return(
        <FlexRow className="gap-4">
            <h1 className="bg-white p-2 rounded-xl">Ключевая фраза:</h1>
            <input onChange={(e)=>setText(e.target.value)} className="rounded-lg p-2 w-[300px]" type="text"/>
        </FlexRow>
    )
}