export default function calculate(button:string, state:State){
  if(state.isNextClear){
    return{
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }

  if(isNumberButton(button)){
    return handleNumberButton(button, state)
  }

  if(isOperatorButton(button)){
    return handleOperatorButton(button, state)
  }

  if(isDotButton(button)){
    return handleDotButton(state)
  }

  if(isDleteButton(button)){
    return handleDeleteButton(state)
  }

  if(isAllClearButton(button)){
    return handleAcButton()
  }

  if(isEqualButton(button))
  return handleEqualButton(state)

}

export interface State{
  current: string;
  operand: number;
  operator: string|null;
  isNextClear: boolean
}

const isNumberButton = (button:string) => {
  return /[0-9]/.test(button)
}

const isOperatorButton = (button: string) => {
  return/\+|-/.test(button)
}

const isDotButton = (button: string) => {
  return button === '.'
}

const isDleteButton = (button: string) => {
  return button ==='D'
}

const isAllClearButton = (button: string) => {
    return button === "AC";
}

const isEqualButton = (button: string) => {
  return button === '='
}

const handleNumberButton = (button:string, state: State):State =>{
  if(state.current === "0"){
    return{
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }
  return {
    current: state.current+button,
    operand: state.operand,
    operator: state.operator,
    isNextClear:false
  }
}

const handleOperatorButton = (button:string, state:State): State => {
  if(state.operator === null) {
    return{
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextClear: true
    }
  }
    const nextValue = operate(state)
    return{
      current:  `${nextValue}`,
      operand: +nextValue,
      operator: button,
      isNextClear: true
    }
}

const handleDotButton = (state: State): State => {
  if(state.current.indexOf('.') !== -1) return state
  return{
    current: state.current + '.',
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  }

}

const handleDeleteButton = (state:State): State => {
  if(state.current.length === 1){
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    }
  }
  return {
    current: state.current.substring(0, state.current.length -1),
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  }
}

const handleAcButton = (): State => {
  return{
    current: '0',
    operand: 0,
    operator: null,
    isNextClear: false
  }
}

const handleEqualButton = (state: State):State =>{
  if(state.operator ===null) return state
  const nextValue = operate(state)
  return{
    current: nextValue,
    operand:0,
    operator: null,
    isNextClear: true
  }
}

const operate = (state: State) :string => {
  const current = parseFloat(state.current)
  if(state.operator === '+'){
    return String(state.operand + current)
  }
  if(state.operator === '-'){
    return String(state.operand - current)
  }
  return state.current
}