import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

// const axios = require('axios');

const Register = () => {
    const { setUser, setLoading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleRegister = (data) => {
        console.log(data)
        axios.post('http://localhost:5000/api/registration', data)
            .then(res => {
                if (res.data.status === 200) {
                    setLoading(true)
                    setUser(data);
                    toast.success("Sucessfully Registered");
                    localStorage.setItem("powerHackToken", res.data.token)
                    navigate(from, { replace: true })
                }
                else {
                    setUser(null);
                    toast.error("An error occured.")
                    localStorage.removeItem("powerHackToken")

                }
            })
            .catch(err => console.log("An Error Occured"));

    }
    return (
        <div>
            <form onSubmit={ handleSubmit(handleRegister) } className=' w-2/3 md:w-1/4 mx-auto my-28'>
                <div className="shadow-primary shadow-xl rounded-xl px-6 pt-10 pb-8">
                    <h4 className=' text-center mb-6  my-2 text-xl font-bold text-primary'>Register</h4>
                    <div className="relative my-2">
                        <input { ...register("name") } required type="text" placeholder="Your Name" className="input input-bordered input-warning w-full max-w-xs" />
                    </div>
                    <div className="relative my-2">
                        <input { ...register("email") } required type="text" placeholder="Your Email" className="input input-bordered input-warning w-full max-w-xs" />
                    </div>
                    <div className="relative my-2">
                        <input { ...register("password") } required type="password" placeholder="Your Password" className="input input-bordered input-warning w-full max-w-xs" />
                    </div>
                    <button type="submit" className="mt-3 text-white w-full bg-primary hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-primary ">Register</button>


                    <p className='mt-3 text-center'>Already have an Account? <span className='text-base font-semibold text-red-700'><Link to='/login'>Login</Link></span></p>
                </div>

            </form>
        </div>
    );
};

export default Register;