// ----------React Hooks----------//
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// ----------React Icons----------//
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

// ----------Data----------//
import { Time } from '../../constants/date';

// ----------Library----------//
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import { colors } from '@mui/material';
import { toast } from 'react-toastify';
import clsx from 'clsx';

const AddUser = () => {

  // ----------States----------//
  const [ID, setID] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [phone2, setPhone2] = useState("")
  const [order, setOrder] = useState("")
  const [userType, setUserType] = useState("")
  const [time, setTime] = useState(Time)
  const [active, setActive] = useState(true)
  const [addPhone, setAddPhone] = useState(false)
  const navigate = useNavigate()



  // ----------Functions----------//

  const handleAdd = (e) => {
    e.preventDefault()

    const phones = [
      {
        phone1: phone,
        phone2: phone2
      }
    ]

    const data = { ID, name, phones, order, userType, time, active };
    if (ID !== '') {
      toast.error("Don't add ID")
    }
    if (name === '') {
      toast.error("Don't add Name")
    }
    if (phone === '+998') {
      setPhone('')
      setPhone2('')
      toast.error("Don't add Phone Number")
    }
    if (order === '') {
      toast.error("Don't add Orders' count")
    }
    if (userType === '') {
      toast.error("Don't add User Type")
    }

    else {
      fetch("http://localhost:3030/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }).then((response) => {
        toast.success('Saved successfully.')
        navigate('/dataTable')
      }).catch((error) => {
        console.log(error.message);
      })
    }
  }
  const AddPhone = () => {
    setAddPhone(true)

  }
  const DeletePhone = () => {
    setPhone2('')
    setAddPhone(false)

  }


  return (
    <div className=' w-1/2 mx-auto'>
      <form  className='flex flex-col shadow-lg p-10 pt-0 '>
        <div className='relative'>
          <label className='absolute pb-0 font-medium top-4 left-3 bg-white p-1 rounded'>Driver ID</label>
          <br />
          <input
            value={ID}
            onChange={(e) => setID(e.target.value)}
            type="number" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

        </div>
        <div className='relative'>
          <label className='absolute pb-0 font-medium top-4 left-3 bg-white p-1 rounded'>Driver's Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

        </div>
        <div className='flex'>
          <PhoneInput style={colors}
            defaultCountry='uz'
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
            className='outline-none '

          />
          <FaPlus onClick={AddPhone} className='font-bold w-9 h-9 p-2 ml-3 bg-green-600 text-white rounded hover:scale-110 duration-500' />
        </div>
        <div className={clsx(
          'flex mt-4',
          !addPhone ? 'hidden' : ''
        )}>
          <PhoneInput style={colors}
            defaultCountry='uz'
            placeholder="Enter phone number"
            value={phone2}
            onChange={setPhone2}
            className='outline-none '
          />
          <RiDeleteBinLine onClick={DeletePhone} size={22} className='font-bold w-9 h-9 p-2 ml-3 bg-red-500 text-white rounded hover:scale-110 duration-500' />
        </div>

        <div className='relative'>
          <label className='absolute pb-0 font-medium top-4 left-3 bg-white p-1 rounded'>All Orders</label>
          <br />
          <input
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            type="number" className='outline-none w-full border border-blue-600 py-2 border-blue-600 rounded p-1  my-2' id='email' />

        </div>
        <div className='relative'>
          <label className='absolute pb-0 font-medium top-4 left-3 bg-white p-1 rounded'>User type</label>
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
        <div className='flex my-4 w-40 justify-start items-center'>
          <input
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            type="checkbox" className='outline-none bg-green-600  w-10 h-10 border border-blue-600   border-blue-600 rounded     pl-0' id='email' />
          <h1 className='w-60 ml-5 font-medium text-xl'>Is Active</h1>

        </div>

        <div className='flex w-full text-right'>
          <Link to={'/dataTable'} className='w-full hover:scale-105 duration-1000 text-center mr-4 bg-red-600 text-white rounded py-2'>Back</Link>
          <button onClick={handleAdd} className='w-full hover:scale-105 duration-1000 mr-4 bg-green-600 text-white rounded py-2'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddUser