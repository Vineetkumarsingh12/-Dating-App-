"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {useState} from "react";




const useError = (errors=[]) => {
    useEffect(()=>{
        errors.forEach(({isError,error,fallback})=>{
            if(isError){
              if(fallback) fallback(); // like navigate
              else toast.error(error?.data.message||"Something went wrong!");
            }
        })
    },[errors]);
}

const useCloseOutside = (ref,handler) => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                dispatch(handler());
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    },[dispatch,handler,ref]);
}

const useAsyncMutation=(mutationHook)=>{
    const [isLoading, setIsLoading] =useState(false);
    const [data,setData]=useState(null);
    const [mutate]=mutationHook();


    const executeMutation=async (toastMessage,...args)=>{
        setIsLoading(true);
const toastId=toast.loading(toastMessage||"Loading...");
try{
    const res=await mutate(...args);
    if(res.data){
        toast.success(res.data.message||"Success",{
            id:toastId
        });//it replace the loading toast with success toast
        console.log("res.data",res.data);
        setData(res.data);
    }else{
        console.log("res.error",res.error);
        toast.error(res?.error?.data?.message||"Something went wrong",{
            id:toastId,
            // duration:5000
        });
    }
}catch(error){
  console.log("error",error);
  toast.error("Something went wrong");
    }finally{
        setIsLoading(false);
   
    }
}
return [executeMutation,isLoading,data];
}


export {useError,useCloseOutside,useAsyncMutation};