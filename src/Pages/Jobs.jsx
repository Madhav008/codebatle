import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar'

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {

        async function getJobs() {
            var config = {
                method: 'GET',
                url: 'http://localhost:5000/jobs',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios(config);
            console.log(res.data);
            try {
                setJobs(res.data)
            } catch (error) {
                console.error(error.message);
            }
        }
        getJobs();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='m-3 flex justify-center max-w-3/4'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Applied
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rejected
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Online Assesment
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 ">
                                        {index + 1}
                                    </th>

                                    <th scope="row" className="flex text-center align-middle px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {/* <div class="relative h-10 w-10 mr-1">
                                            <img
                                                class="h-full w-full rounded-full object-cover object-center"
                                                src={job.image}
                                                alt=""
                                            />
                                        </div> */}
                                        {job.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Red</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Green</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>
                                    </td>
                                </tr>
                            )
                            )}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Jobs