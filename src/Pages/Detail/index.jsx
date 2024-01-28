import React, { useEffect, useState } from 'react'

// ------------Hooks-------------//
import { Link, useParams } from 'react-router-dom'



const Details = () => {
    const { id } = useParams()

    // ------------States-------------//
    const [data, setData] = useState({})

    // ------------useEffects-------------//
    useEffect(() => {
        fetch("http://localhost:3030/users/" + id).then((response) => {
            return response.json()
        }).then((response) => {
            setData(response)

        }).catch((error) => {
            console.log(error.message);
        })
    })
    return (
        <div className='border-1 shadow-lg w-3/4 mx-auto p-20'>

            <div className='flex items-center my-4'>
                <h1 className='mr-4 text-xl font-bold '>User name is:</h1><span className='text-lg'>{data.name}</span>
            </div>
            <div className='flex items-center my-4'>
                <h1 className='mr-4 text-xl font-bold '>User's Identifier:</h1><span className='text-lg'>{data.ID}</span>
            </div>
            <div className='flex items-center my-4'>
                {
                    data.phones?.map((phone) => (
                        <div className='flex items-start flex-col'>

                            <div className='flex items-center '>
                                <h1 className='mr-4 text-xl font-bold '>Phone Number is:</h1>    <h1>{phone.phone1}</h1>
                            </div>
                            <div className='flex items-center mt-4'>
                                <h1 className='mr-4 text-xl font-bold '>{`${phone.phone2 === '+998' ? '' : 'Second Phone Number'}`}</h1>    <h1>{phone.phone2 === '+998' ? '' : phone.phone2}</h1>
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className='flex items-center my-4'>
                <h1 className='mr-4 text-xl font-bold '>Number of orders:</h1><span className='text-lg'>{data.order}</span>
            </div>
            <div className='flex items-center my-4'>
                <h1 className='mr-4 text-xl font-bold '>User's type</h1><span className='text-lg'>{data.order}</span>
            </div>
            <div className='flex items-center my-4'>
                <h1 className='mr-4 text-xl font-bold '>Created time:</h1><span className='text-lg'>{data.time}</span>
            </div>


            <Link to={'/dataTable'} className='bg-blue-600 rounded p-1 text-xl w-60 px-5  text-white'>Back</Link>
        </div>
    )
}

export default Details