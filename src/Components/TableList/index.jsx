// -----Hooks -----------//
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// -----Libraries ------//
import { toast } from 'react-toastify';

// -----React Icons------//
import { TbNumber } from "react-icons/tb";import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";

const DataTable = () => {
    // -----States ------//
    const [data, setData] = useState(null)
    const [action, setAction] = useState(false)
    const navigate = useNavigate()

    // -----Functions------//  
    const Details = (id) => {
        navigate("/user/details/" + id)
    }
    const Edit = (id) => {
        navigate("/user/edit/" + id)
    }
    const Delete = (id) => {
        if (window.confirm('Do You want to remove?')) {
            fetch("http://localhost:3030/users/" + id, {
                method: "DELETE",

            }).then((response) => {
                toast.success("Deleted user");
                window.location.reload()
            }).catch((error) => {

            })
        }
    }


    // -----useEffects ------// 
    useEffect(() => {
        fetch("http://localhost:3030/users").then((res) => {
            return res.json();

        }).then((response) => {
            setData(response)
            console.log(response);
        }).catch((errpr) => {
            console.log(errpr.message);
        })
    }, [])


    return (

        <div className='mt-15 h-auto'>
            <div className='w-full text-right flex  justify-between'>
                <h1 className='text-xl font-medium'>All Users</h1>
                <Link to={'/user/addUser'} className='bg-green-600 flex items-center mr-5 p-2 rounded text-white'>
                        Add <FaPlus className='ml-5'/>
                     
                </Link>
            </div>

            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <TbNumber size={20} />
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Driver ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Driver's name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            All Orders
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data created
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map((item) => (
                            <tr key={item.id} className="border-b">

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
                                    <div className='w-full ml-10'>
                                    </div>
                                    <button
                                        onClick={() => { Edit(item.id) }}
                                        className='text-black p-1 rounded text-lg'>
                                        <span className='flex items-center'>
                                            <CiEdit className='text-blue-800 hover:shadow-lg hover:scale-110 duration-500' />
                                        </span>





                                    </button>
                                    <button
                                        onClick={() => { Details(item.id) }}
                                        className='text-black p-1 rounded text-lg'>
                                        <span className='flex items-center'>
                                            <TbListDetails className='text-blue-800  hover:shadow-lg hover:scale-110 duration-500' />
                                        </span>





                                    </button>
                                    <button
                                        onClick={() => { Delete(item.id) }}
                                        className='text-black p-1 rounded text-lg'>
                                        <span className='flex items-center'>
                                            <AiOutlineDelete className='text-red-500 ml-10 hover:shadow-lg hover:scale-110 duration-500' />
                                        </span>





                                    </button>


                                </td>


                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>


    );
}

export default DataTable