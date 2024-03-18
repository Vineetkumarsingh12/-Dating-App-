 "use client";

    import { useForm } from "react-hook-form";

  import { useRouter } from "next/navigation";
   
    import axios from "axios";

    
    const isAdmin=false;

export default function Admin() {
        interface IFormInput {
          
            password: string;
           
        }
    
        
        const { register, handleSubmit } = useForm<IFormInput>();
      
       
    const router=useRouter();
      
    
        const onSubmit = (data: IFormInput) => {
            console.log(data);
            const { password} = data;
            // Your form submission logic here
        }
     if(isAdmin){
   router.push("/admin/dashboard");
     }

        return (
            <div className="flex justify-center items-center h-screen flex-col " style={{
                backgroundImage:"linear-gradient(rgb(80 214 29 / 75%), rgb(0 0 0 / 48%))",
            }}>
               
                <form className="max-w-md w-full px-4" onSubmit={handleSubmit(onSubmit)}>
                  
             
                 
                    <div className="mb-4 relative">
                        <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" type="password" {...register('password')} placeholder="" />
                        <label className="placeholder-label">Password</label>
                    </div>
               
                    <button className="w-full bg-blue-500 text-white rounded px-3 py-2 mb-4" type="submit"> Login</button>
                </form>
                <style jsx>{`
                    .placeholder-label {
                        position: absolute;
                        top: 0.6rem;
                        left: 1rem;
                        font-size: 1rem;
                        color: #7d7d7d;
                        transition: all 0.2s ease-in-out;
                        pointer-events: none;
                    }
    
                    input:focus + .placeholder-label, input:not(:placeholder-shown) + .placeholder-label {
                        top: -0.5rem;
                        font-size: 0.8rem;
                        color: white;
                        padding: 0 0.25rem;
                        background-color:rgb(80 214 29 );
                       
                    }
                `}</style>
            </div>
        );
    }



