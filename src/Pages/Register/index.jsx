import React, { useState } from 'react';

// ----------Hooks------//
import { Link, useNavigate } from 'react-router-dom'

// ---------Library---------//
import { toast } from 'react-toastify'

// --------Firebase library--------//
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/config'

// -------------Images-----//
import register from '../../assets/loginimg.png'

const Register = () => {
    // ---------States----------//
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
   
//    --------------Functions-------------//
    const registerUser = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password do not match.")

        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                toast.success("Registeration SUccessfull...")
                navigate('/login')

            })
            .catch((error) => {
                toast.error(error.message)
            })
    }
    return (
        <div className='absolute top-0 z-30 bg-white w-full h-screen flex justify-between items-start'>
            <div className='w-1/2 max-lg:hidden'>
                <img className='w-full h-screen ' src={register} alt="" />
            </div>
            <div className='w-3/4 max-lg:w-11/12 h-screen flex justify-center items-center '>
                <form onSubmit={registerUser} className='flex flex-col shadow-lg w-3/4 max-lg:w-full   p-10 '>
                     

                    <div className='relative'>
                        <label className='font-medium absolute top-5 px-1 bg-white left-5' htmlFor="email">Email</label>
                        <br />
                        <input
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Email'
                            type="email" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

                    </div>
                    <div className='relative'>
                        <label className='font-medium absolute top-5 px-1 bg-white left-5'>Password</label>
                        <br />
                        <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            placeholder='password'
                            className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='password' />

                    </div>
                    <div className='relative'>
                        <label className='font-medium absolute top-5 px-1 bg-white left-5'>Confirm Password</label>
                        <br />
                        <input
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='password' />

                    </div>


                    <button type='submit' className='w-full bg-blue-600 text-white rounded py-2'>Register</button>

                    <button
                        type='button' className=''> Already have an account? <Link to={'/login'}>Login</Link></button>
                </form>
            </div>

        </div>
    )
}

export default Register