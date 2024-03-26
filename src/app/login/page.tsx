"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import Image from 'next/image';
import axios from "axios";

export default function Page() {
    interface IFormInput {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit } = useForm<IFormInput>();
    const [isLogin, setIsLogin] = useState(false);
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(null);

    const imgClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader:any = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: IFormInput) => {
        console.log(data);
        const { name, email, password, confirmPassword } = data;
        // Your form submission logic here
        if (isLogin) {
            if (password !== confirmPassword) {
                alert('Password and confirm password do not match');
                return;
            }
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);
            axios.post('http://localhost:5000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
        } else {
            axios.post('http://localhost:5000/login', {
                email,
                password
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    return (
        <div className="flex justify-center items-center h-screen flex-col " style={{
            backgroundImage:"linear-gradient(rgb(80 214 29 / 75%), rgb(0 0 0 / 48%))",
        }}>
            {
                isLogin && (
                    <div className="mb-4 flex justify-center relative">
                        {
                            preview ? <Image src={preview} alt="pic" width={200} height={200} className="rounded-full shadow-md" /> : 
                            <IoPersonCircleSharp className="w-[10rem] h-[10rem] object-contain cursor-pointer" onClick={imgClick}/>
                        }
                        <button className="absolute bottom-2 right-2" onClick={imgClick}>
                            <FaCamera className="w-[2rem] h-[2rem] text-gray-400" />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                            />
                        </button>
                    </div>
                )
            }
            <form className="max-w-md w-full px-4" onSubmit={handleSubmit(onSubmit)}>
                {/* take image as input */}
                {isLogin && (
                    <div className="mb-4 relative">
                        <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" {...register('name')} placeholder=" " />
                        <label className="placeholder-label">Name</label>
                    </div>
                )}
                <div className="mb-4 relative">
                    <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" {...register('email')} placeholder="" />
                    <label className="placeholder-label">Email</label>
                </div>
                <div className="mb-4 relative">
                    <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" type="password" {...register('password')} placeholder="" />
                    <label className="placeholder-label">Password</label>
                </div>
                {isLogin && (
                    <div className="mb-4  relative">
                        <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" type="password" {...register('confirmPassword')} placeholder="" />
                        <label className="placeholder-label">Confirm Password</label>
                    </div>
                )}
                <p onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer">{isLogin ? 'Already have an account? Login' : "Don't have an account? Sign up"}</p>
                <button className="w-full bg-blue-500 text-white rounded px-3 py-2 mb-4" type="submit">{isLogin ? 'Register' : 'Login'}</button>
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
