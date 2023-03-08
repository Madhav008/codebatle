import React, { useEffect, useState } from 'react'
import './problem.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const Problems = (props) => {




    return (
        <>
            <div className="flex flex-col items-center h-[100%]">
                <div className='py-5 w-full '>
                    <div className="flex justify-between text-center items-center">
                        <h2 className="text-lg font-bold">{props.title}</h2>
                        <div className='w-max ml-auto flex gap-1 p-2'>
                            <button onClick={props.prev} className="btn btn-square btn-sm bg-primary text-white">
                                <MdArrowBackIos />
                            </button>
                            <button onClick={props.next} className='btn btn-square btn-sm bg-primary text-white'>

                                <MdArrowForwardIos />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm ">
                        <div className={`px-3 py-1 rounded-full mr-2 text-white ${props.difficulty === "Easy" ? "bg-green-600" : props.difficulty === "Medium" ? "bg-yellow-600" : "bg-red-600"}`}>
                            {props.difficulty}
                        </div>
                    </div>
                </div>

                <div id="problem" dangerouslySetInnerHTML={{ __html: props.question }} />

            </div>
        </>
    )

}

export default Problems