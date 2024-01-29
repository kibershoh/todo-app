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
import Row from '../Row';

const DataTable = () => {
    // -----States ------//
    const [data, setData] = useState(null)
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
                        data?.map((item) => (
                            <tr key={item.id}>
                               <Row  item={item} Edit={Edit} Details={Details} Delete={Delete}/>
                            </tr>
                            ))
                    }

                </tbody>
            </table>
        </div>


    );
}

export default DataTable