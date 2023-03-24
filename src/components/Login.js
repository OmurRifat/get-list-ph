
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Login = () => {
    const { user, setUser, setLoading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    const handleLogin = (data) => {
        axios.post('https://get-list-ph-server.vercel.app/api/login', data)
            .then(res => {
                if (res.data.status === 200) {
                    setUser(data)
                    toast.success("Login Sucessful.");
                    navigate('/billings-data')
                    localStorage.setItem("powerHackToken", res.data.token)
                }
                else {
                    setUser(null)
                    toast.error("Wrong Credentials, Please try again.")
                    localStorage.removeItem("powerHackToken")
                }
            })
            .catch(err => console.log("An Error Occured"));
    }

    if (user) {
        return (
            <div>
                <button className='btn btn-info font-bold'><Link to='/billings-data'>Go to billing page</Link></button>
            </div>
        );
    }

    return (
        <div className=' mt-12'>
            <form onSubmit={ handleSubmit(handleLogin) } className=' w-full mx-auto'>
                <div className="shadow-primary shadow-xl rounded-xl px-6 pt-10 pb-8 bg-white">
                    <h4 className=' text-center mb-6  my-2 text-xl font-bold text-primary'>Login</h4>
                    <div className="relative my-2">
                        <input { ...register("email") } required type="text" placeholder="Your Email" className="input shadow-inner shadow-blue-50 border-0 w-full max-w-xs" />
                    </div>
                    <div className="relative my-2">
                        <input { ...register("password") } required type="password" placeholder="Your Password" className="input shadow-inner shadow-blue-50 border-0 w-full max-w-xs" />
                    </div>
                    <button type="submit" className="mt-3 text-white w-full bg-primary hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-primary ">Login</button>


                    <p className='mt-3 text-center text-black'>Don't have any Account? <span className='text-base font-semibold text-red-700'><Link to='/register'>Register</Link></span></p>
                </div>
            </form>
        </div>
    );
};

export default Login;