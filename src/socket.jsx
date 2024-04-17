"use client";
import { useMemo } from "react";
import io from "socket.io-client";
import { createContext } from "vm";



const socketContext=createContext();


const socketProvider=({children})=>{

//    const socket=useMemo(()=>{
// },[])


    return(
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}