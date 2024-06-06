import { createContext, useState } from "react";


export let CounterContext = createContext(0) //use Contex


export  default function CounterContextProvider({children})
{
    let [counter,setCounter] = useState(0)
    function increase()
    {
        setCounter(counter+1)
    }

    return <CounterContext.Provider value={{counter,increase}}>
        {children}
    </CounterContext.Provider>
}

