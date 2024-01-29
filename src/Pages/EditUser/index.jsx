import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Time } from '../../constants/date';
import { toast } from 'react-toastify';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import clsx from 'clsx';
const Edit = () => {
    const { id } = useParams();


    // ------------Hooks-------------//
    const [ID, setID] = useState("")
    const [name, setName] = useState("")
    const [phone1, setPhone1] = useState("")
    const [phone2, setPhone2] = useState("")
    const [order, setOrder] = useState("")
    const [userType, setUserType] = useState("")
    const [time, setTime] = useState(Time)
    const [active, setActive] = useState(false)
    const [addPhone, setAddPhone] = useState(true)




    const navigate = useNavigate()

    // ---------------useEffects-----------//
    useEffect(() => {
        fetch('http://localhost:3030/users/'+id,{ 

         }).then((response) => {
                return response.json();

            }).then((response) => {
                setID(response.ID)
                setName(response.name)
                setOrder(response.order)
                setUserType(response.userType)
                setActive(response.active)
                const Phones = response.phones
                Phones.forEach(element => {
                    setPhone1(element.phone1)
                    setPhone2(element.phone2)
                });
                
            }).catch((error) => {
                console.log(error.message);
            })
    }, [])



    // ----------Functions----------//
    const handleAdd = (e) => {
        e.preventDefault()
        const phones = [
            {
                phone1: phone1,
                phone2: phone2
            }
        ]

        const data = { ID, name, phones, order, userType, time, active };

        if (ID === '') {
            toast.error("Don't add ID")
        }
        if (name === '') {
            toast.error("Don't add Name")
        }
        if (phone1 === '+998') {
            toast.error("Don't add Phone Number")
        }
        if (order === '') {
            toast.error("Don't add Orders' count")
        }
        if (userType === '') {
            toast.error("Don't add User Type")
        }

        else if(ID !== '' && name!=='' && phone1!=='+998' && order!=='' && userType!==''){
            fetch("http://localhost:3030/users/" + id, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            }).then((response) => {

                toast.success('Edited successfully.')
                navigate('/dataTable')
            }).catch((error) => {
                console.log(error.message);
            })
        }


    }
    const AddPhone = () => {
        setAddPhone(true)
       if(phone2 === '+998'){
        setAddPhone(false)
       }
    }
    const DeletePhone = () => {
        if(window.confirm('Do you want to delete?')){

            setPhone2('')
            setAddPhone(false)
        }

    }
    return (
        <div className=' w-1/2 mx-auto h-screen'>
            <form onSubmit={handleAdd} className='flex flex-col shadow-lg p-10 pt-0'>
                
                {/* Inputs */}

                <div className='relative'>
                    <label className='absolute  font-medium top-4 left-3 bg-white p-1 pb-0 rounded'>Driver ID</label>
                    <br />
                    <input
                        value={ID}
                        onChange={(e) => setID(e.target.value)}
                        type="text" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

                </div>
                <div className='relative'>
                    <label className='absolute  font-medium top-4 left-3 bg-white p-1 pb-0 rounded'>Driver's Name</label>
                    <br />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

                </div>
                <div className='flex'>
                    <PhoneInput
                        defaultCountry='uz'
                        placeholder="Enter phone number"
                        value={phone1}
                        onChange={setPhone1}
                        className='outline-none '

                    />
                    <FaPlus onClick={AddPhone} className='font-bold w-9 h-9 p-2 ml-3 bg-green-600 text-white rounded hover:scale-110 duration-500' />
                </div>
                <div className={clsx(
                    'flex mt-4',
                    !addPhone ? 'hidden' : ''
                )}>                   
                                            
                    <PhoneInput
                        defaultCountry='uz'
                        placeholder="Enter phone number"
                        value={phone2}
                        onChange={setPhone2}
                        className='outline-none '
                    />
                    <RiDeleteBinLine onClick={DeletePhone} size={22} className='font-bold w-9 h-9 p-2 ml-3 bg-red-500 text-white rounded hover:scale-110 duration-500' />
                </div>
                <div className='relative'>
                    <label className='absolute  font-medium top-4 left-3 bg-white p-1 pb-0 rounded'>All Orders</label>
                    <br />
                    <input
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        type="text" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

                </div>
                <div className='relative'>
                    <label className='absolute  font-medium top-4 left-3 bg-white p-1 pb-0 rounded'>User type</label>
                    <br />
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1 my-2'
                    >
                        <option value="">---Type---</option>
                        <option value="Client">Client</option>
                        <option value="Driver">Driver</option>
                    </select>
                </div>

                <div className='flex my-1 w-40 justify-start items-center'>
                    <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox" className='outline-none  w-10 h-10 border border-blue-600   border-blue-600 rounded     pl-0' id='email' />
                    <h1 className='w-60 ml-5 font-medium text-xl'>Is Active</h1>

                </div>

                <div className='flex w-full text-right'>

                    <button onClick={()=>navigate('/dataTable')} className='w-full mr-4 bg-red-600 text-white rounded py-2 hover:scale-110 duration-1000'>Cancel</button>
                    <button type='submit' onClick={handleAdd} className='w-full mr-4 bg-green-600 text-white rounded py-2 hover:scale-110 duration-1000'>Save</button>

                </div>
            </form>
        </div>
    )
}

export default Edit