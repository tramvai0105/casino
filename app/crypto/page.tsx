'use client'

import { useState } from "react";
import Spacer from "../ui/spacer";
import { FlexCol, FlexRow } from "../utils/flex";
import {codeAlgorithm, decodeAlgorithm} from "./algorithm";
import KeyPhrase from "./ui/keyphrase";
import TextArea from "./ui/textarea";

export default function Page(){
    const [phrase, setPhrase] = useState<string>("")
    const [secret, setSecret] = useState<string>("")
    const [result, setResult] = useState<string>("")

    function code(){
        let res = codeAlgorithm(phrase, secret);
        setResult(res)
    }    

    function decode(){
        let res = decodeAlgorithm(phrase, secret);
        setResult(res)
    }    

    return(
        <FlexCol className="text-black">
            <Spacer size={40}/>
            <FlexRow className="mb-10 gap-3">
                <KeyPhrase setText={setSecret}/>
                <button onClick={code} className="text-white rounded-lg p-3 border-[2px] border-white">Code</button>
                <button onClick={decode} className="text-white rounded-lg p-3 border-[2px] border-white">Decode</button>
            </FlexRow>
            <FlexRow className="gap-20">
                <TextArea setText={setPhrase}/>
                <TextArea text={result}/>
            </FlexRow>
        </FlexCol>
    )
}