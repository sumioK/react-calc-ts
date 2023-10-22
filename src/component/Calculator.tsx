import { useState } from "react";
import calculate, { State } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";

export default function Calculater(){
  const [state, setState] = useState<State>({
    current:"0",
    operand:0,
    operator:null,
    isNextClear:false
  })
  const buttonHandler =(code:string) => {
    const nextState = calculate(code, state)
    if(nextState){
      setState(nextState)
    }
  }
  return (
    <div>
      <Display value={state.current}/>
      <ButtonPanel buttonHandler={buttonHandler}/>
    </div>
  )
}