import React from 'react'
// import './terminal.css'

const InputTerminal = (props) => {

 
  return (
    <div className="bg-gray-700 p-4 flex flex-col rounded-lg text-white container mb-4 h-[100%]">
      
      <textarea
        value={props.input}
        onChange={props.getInput}
        placeholder="Enter your input here..."
        className="resize-none border border-gray-400 rounded-lg p-2  w-full h-[100%]"
      />
    </div>
  )
}

export default InputTerminal