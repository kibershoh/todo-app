import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// ---------React Icons -----//
import { AiOutlineDelete } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { TbListDetails } from 'react-icons/tb'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
const Row = (props) => {
    const { item, Delete, Edit, Details } = props

    const [open, setOpen] = useState(false)
    const OpenModal = () => {
        setOpen(!open)
    }
    return (
        <>

            <td className="px-6 text-black py-4">
                {item.id}
            </td>
            <td className="px-6 text-black py-4">
                {item.ID}
            </td>
            <td className="px-6 text-black py-4">
                {item.name}
            </td>
            <td className="px-6 text-black py-4">
                {
                    item.phones.map((phone, index) => (
                        <h1>{phone.phone1 === '+998' ? '' : phone.phone1}
                            <br />
                            {phone.phone2 === '+998' ? '' : phone.phone2}
                        </h1>
                    ))
                }
            </td>
            <td className="px-6 text-black py-4">
                {item.order}
            </td>
            <td className="px-6 text-black py-4">
                {item.userType}
            </td>
            <td className="px-6 text-black py-4">
                {item.time}
            </td>
            <td className="px-6 text-black py-4 relative">
                <BsThreeDotsVertical size={22} onClick={OpenModal} className='hover:scale-110' />
                <div className={
                    clsx(
                        'absolute z-20 bg-white flex flex-col border right-10 shadow-lg rounded p-2 right-24 w-60 -left-30',
                        open ? '' : 'hidden'
                    )
                }

                >
                    <div className=' flex justify-end'>
                        {/* <span></span> */}
                        <IoCloseOutline className='font-medium hover:scale-125 duration-1000' onClick={OpenModal} size={20} />

                    </div>
                    <button
                        onClick={() => { Edit(item.id) }}
                        className='text-black p-1 rounded text-lg hover:scale-110 duration-500'>
                        <span className='flex items-center font-medium'>

                            <CiEdit className='text-blue-800 mr-5 hover:shadow-lg ' />
                            Edit
                        </span>
                    </button>
                    <button
                        onClick={() => { Details(item.id) }}
                        className='text-black p-1 rounded text-lg hover:scale-110 duration-500'>
                        <span className='flex items-center font-medium'>

                            <TbListDetails className='text-blue-800 mr-5 hover:shadow-lg ' />
                            Details
                        </span>
                    </button>
                    <button
                        onClick={() => { Delete(item.id) }}
                        className='text-black p-1 rounded text-lg hover:scale-110 duration-500'>

                        <span className='flex items-center font-medium'>

                            <AiOutlineDelete className='text-red-500 mr-5 hover:shadow-lg ' />
                            Delete
                        </span>
                    </button>
                </div>
            </td>
        </>




    )
}

export default Row