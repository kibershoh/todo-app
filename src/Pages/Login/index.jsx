// --------Hooks---------👇//
import React, { useState } from 'react'

// --------Library---------👇//

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// --------Firebase library---------👇//

import {  signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/config'

// --------Images------👇/

import register from '../../assets/loginimg.png'

const Login = () => {
    // ---------States--------👇//
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();



    //  ------------------ Functions ------------------ 👇//
    const loginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success("Login Successfull...")
                navigate('/dataTable')
            })
            .catch((error) => {
                toast.error("You have not entered any information ")
            })

    }
    return (
        <div className='w-full absolute z-30 bg-white top-0 h-screen flex justify-between max-lg:flex-wrap items-start'>
            <div className='w-1/2 max-lg:hidden '>
                <img className='w-full h-screen ' src={register} alt="" />
            </div>
            <div className='w-3/4 max-lg:w-11/12 h-screen flex justify-center items-center '>
                <form onSubmit={loginUser} className='flex flex-col shadow-lg   p-10 '>
                    <div className='relative'>
                        <label className='font-medium absolute top-5 left-5 bg-white px-1' htmlFor="email">Email</label>
                        <br />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            type="email" className='export const inputStyles = "outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2 outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />
                    </div>
                    <div className='relative'>
                        <label className='font-medium absolute top-5 left-5 bg-white px-1'>Password</label>
                        <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='password'
                            className='export const inputStyles = "outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2 outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2'
                            id='password' />

                    </div>
                    <Link to={'/reset'} className='text-blue-600'>Reset password</Link>
                    <button type='submit' className='w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-800 duration-1000'>Login</button>
                    <button type='button'>Register if you don't have an account <Link to={'/register'} className='text-blue-600'>Register</Link></button>
                </form>
            </div>

        </div>
    )
}

export default Login