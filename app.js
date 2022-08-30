const textScreen = document.querySelector('#calcScreen');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#clear');
const dotBtn = document.querySelector('#dot');
const equalBtn = document.querySelector('#equal');
const negativeBtn = document.querySelector('#negative');

let result=0;
let stockedValue=null;
let actuValue = '';
let dotOn=false;
let strOpe = '';

const add = (a,b)=>{
    a = Number(a);
    b = Number(b);
    return a+b
}

const subtract = (a,b)=>{
    a = Number(a);
    b = Number(b);
    return a-b
}

const multiply = (a,b)=>{
    a = Number(a);
    b = Number(b);
    return a*b
}

const divide = (a,b)=>{
    a = Number(a);
    b = Number(b);
    if(b === 0) {
        textScreen.value = 'can\'t devide by 0';
        return 
    }
    return a/b
}

const operate = (ope,stockedValue,actuValue)=>{
    a = Number(stockedValue);
    b = Number(actuValue);
    return  ope === "add" ? add(stockedValue,actuValue):
            ope === "subtract"? subtract(stockedValue,actuValue):
            ope === "multiply" ? multiply(stockedValue,actuValue):
            ope === "divide" ? divide(stockedValue,actuValue): actuValue;
}

const showResult = () =>{
    if(stockedValue && actuValue){
        result = Math.floor(operate(strOpe,stockedValue,actuValue)*1000)/1000;
        clearScreen();
        strOpe = '';
        stockedValue = result;
        textScreen.value=`${result}`;
    }
    
}

const clearScreen= () =>{
    actuValue = '';
    textScreen.value='';
}

const clearAll= () =>{
    actuValue = '';
    stockedValue = null;
    strOpe = '';
    result = 0;
    textScreen.value='000';
}

const activateDot = () => {
    if(!actuValue.includes('.')){
        dotOn = !dotOn;
        if(!actuValue){
            actuValue= `0${actuValue}.`;
            changeTxt();
        }
        else{
            actuValue= `${actuValue}.`;
            changeTxt();
        }
        
    }
    
}

const changeSign=()=>{
    if(actuValue){
        actuValue = `${(-1)*Number(actuValue)}`;
        changeTxt();
    }
    else if(result){
        actuValue =`${(-1)*Number(result)}`;
        changeTxt();
    }
}

const changeTxt=()=>{
    textScreen.value=`${actuValue}`;
}

const updateActuValue =(e)=>{
    actuValue = `${actuValue}${e.target.innerText}`;
}

const setOperand = (e) =>{
    if(!actuValue){
        strOpe = `${e.target.id}`;
        return
    }
    
    if(stockedValue === null){
        strOpe = `${e.target.id}`;
        stockedValue = actuValue;
        clearScreen();
    }
    else {
        showResult();
        strOpe = `${e.target.id}`;
    }
    
}


[...digitBtns].forEach(button=>{
    button.addEventListener('click', (e)=>{
        updateActuValue(e);
        changeTxt();
    });
} );

[...operatorBtns].forEach(button=>{
    button.addEventListener('click', (e)=> setOperand(e));
} );

equalBtn.addEventListener('click',()=> showResult(strOpe));
dotBtn.addEventListener('click',activateDot);
negativeBtn.addEventListener('click',changeSign);
clearBtn.addEventListener('click', clearAll);