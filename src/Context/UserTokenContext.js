import { createContext, useState } from "react";



export let UserTokenContext = createContext(null)

export default function UserTokenContextProvider({children})
{
   
    let [isLogin,setLogin] = useState(null)
    return<UserTokenContext.Provider value={{isLogin,setLogin}}>
        {children}
    </UserTokenContext.Provider>
}