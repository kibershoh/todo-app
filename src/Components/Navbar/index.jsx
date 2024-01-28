//----------Hooks------//

import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// -----React Icons ------//

import { HiMenuAlt1 } from "react-icons/hi";


// -----Datas ------//

import navLinks from '../../constants/navbar';

// -----Firebase library ------//
import { auth } from '../../Firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {

    // -----States ------//
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    // -----Functions------//
    const logoutUser = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            toast.success("Logout successfuly.")
            navigate('/')
        }).catch((error) => {
            toast.error(error.message)
        })
        window.location.reload()
    }

    // -----Hooks ------//
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                if (user.displayName === null) {
                    const username1 = user.email.substring(0, user.email.indexOf('@'))
                    const username2 = username1.charAt(0).toUpperCase() + username1.slice(1)
                    setDisplayName(username2)
                }

                setEmail(user.email)
            }
            else {
                setDisplayName(" ")
            }
        })
    }, [displayName])




    return (
        <div className="w-full fixed z-30">
            <div className='flex justify-between py-2 items-center pr-5 p-1 bg-slate-200 max-w-full w-full fixed top-0 left-0' >
                <Link className="block max-lg:hidden">
                    <h1 className="lg:text-center text-2xl font-bold logotip pl-3">
                        TODO {displayName}
                    </h1>
                </Link>
                <Link to="#" className="block lg:hidden">
                    <button >
                        <HiMenuAlt1 className="HiMenuAlt1" size={22} />
                    </button>
                </Link>

                <div className="flex items-center">
                    <ul className="flex">
                        {navLinks.map((nav) => (
                            <li key={nav.id} className="text-base mx-5 links">
                                <NavLink
                                    to={nav.path}
                                    className='flex hover:text-blue-600 text-xl' >
                                    {nav.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <Link className='mx-2 bg-blue-600 p-2 rounded-lg text-white' to={'/login'}>Login</Link>
                        <Link className='mx-2 bg-blue-600 p-2 rounded-lg text-white' to={'/register'}>Register</Link>
                        <Link className='mx-2 bg-blue-600 p-2 rounded-lg text-white' onClick={logoutUser} >Logout</Link>
                    </div>
                    <div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Navbar
