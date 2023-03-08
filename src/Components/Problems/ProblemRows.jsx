import React from 'react'
import { useSelector } from 'react-redux'
import {STATUSES} from '../../store/QuestionsSlice';
import { Link } from 'react-router-dom';

const ProblemRows = () => {
    const { data: questions, status } = useSelector((state) => state.questions)

    if (status === STATUSES.LOADING) {
        return <h2>Loading....</h2>;
    }

    return (
        <>
            {questions.map((question,index) => (
                <tr key={question.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className='py-4 px-6 font-medium'>
                        {index+1}.
                    </td>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 dark:text-white " >
                       <Link to={`/problem/${question.id}`}> {question.name}</Link>
                    </th>
                    {question.difficulty === 'Basic' ? <td className="py-4 px-6">
                        <div className="badge badge-success max-w-sm m-auto font-bold text-gray-50">{question.difficulty}</div>
                    </td> : null}
                    {question.difficulty === 'Easy' ? <td className="py-4 px-6">
                        <div className="badge badge-primary max-w-sm m-auto font-bold text-gray-50">{question.difficulty}</div>
                    </td> : null}
                    {question.difficulty === 'Medium' ? <td className="py-4 px-6">
                        <div className="badge badge-secondary max-w-sm m-auto font-bold text-gray-50">{question.difficulty}</div>
                    </td> : null}
                    {question.difficulty === 'Hard' ? <td className="py-4 px-6">
                        <div className="badge badge-accent max-w-sm m-auto font-bold text-gray-50">{question.difficulty}</div>
                    </td> : null}
                </tr>
            ))}

            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">
                    <div className="badge badge-secondary max-w-sm m-auto font-bold text-gray-50">Medium</div>
                </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="py-4 px-6">
                    <div className="badge badge-accent max-w-sm m-auto font-bold text-gray-50">Hard</div>
                </td>
            </tr> */}
        </>
    )
}

export default ProblemRows