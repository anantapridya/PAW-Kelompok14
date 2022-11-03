import { useState } from "react";
import * as React from "react";
import DefaultBtn from "./DefaultBtn";
import DefaultInput from "./DefaultInput";

function BtnPlus (props){
    return(
        <DefaultBtn
        type="button"
        judulButton="+"
        className="w-[40px] h-[50px] text-2xl text-biru-tua bg-biru-sedang rounded-lg
                   hover:bg-biru-muda hover:transition-all"
        onClick={props.onClickFunc}
        />
    )
}

function BtnMinus (props){
    return(
        <DefaultBtn
        type="button"
        judulButton="-"
        className="w-[40px] h-[50px] text-2xl text-biru-tua bg-biru-sedang rounded-lg
                   hover:bg-biru-muda hover:transition-all"
        onClick={props.onClickFunc}
        />
    )
}

function DisplayStock(props){
    return(
        <DefaultInput
            className="w-[200px] h-[50px]"
            value={props.message}
        />
    )
}

export default function Stock(props) {
    const [counter, setCounter] = useState(0);
    const plusCounter = () => setCounter(counter + 1);
    let minusCounter = () => setCounter(counter - 1);
    
    return (
        <div className="grid grid-cols-[220px_60px_50px] flex flex-col items-center">
            <DisplayStock message={counter}/>
            <BtnMinus onClickFunc={minusCounter}/>
            <BtnPlus onClickFunc={plusCounter}/>
        </div>
    );
}