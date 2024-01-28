// Routes and React library
import React, { useState } from 'react'

// Styles library
import { toast } from 'react-toastify'
import register from '../../assets/loginimg.png'

// Firebase library
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../Firebase/config'
import { Link } from 'react-router-dom'


const Reset = () => {
    // ---------States ----------- //
    const [email, setEmail] = useState('')

    // ---------Functions ------ Reset password //   
    const resetPassword = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Check your email for a reset link")
            }).catch((error) => {
                toast.error(error.message)

            })
    }

    return (
        <div className='absolute top-0 bg-white z-30 w-full h-screen flex justify-between max-lg:flex-wrap items-start'>
            <div className='w-1/2 max-lg:hidden '>
                <img className='w-full h-screen ' src={register} alt="" />
            </div>
            <div className='w-1/2 max-lg:w-11/12 h-screen flex justify-center items-center '>
                <form onSubmit={resetPassword} className='flex flex-col shadow-lg  w-3/4 p-5 '>

                    <div className='relative'>
                        <label className='absolute top-5 left-2 bg-white px-1' htmlFor="email">Email</label>
                        <br />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            type="email" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

                    </div>


                    <button type='submit' className='w-full my-2 bg-blue-600 text-white rounded py-2'>Reset Password</button>
                    <div className=''>
                        <Link to={'/login'} className='w-full text-blue-600 my-2 mx-2  text-black rounded py-2'>Login</Link>
                        <Link to={'/register'} className='w-full text-blue-600 my-2 mx-2  text-black rounded py-2'>Register</Link>
                    </div>

                </form>
            </div>

        </div>

    )
}

export default Reset;