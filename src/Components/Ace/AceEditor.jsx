import React, { useState } from "react";
import AceEditor from "react-ace";
import './ace.css'
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";
import { MdTimer } from "react-icons/md"
import { useSelector } from "react-redux";
const AceEditors = (props) => {
  const [size, setSize] = useState(20);
  const [theame, settheame] = useState("cobalt");
  const [hide, setHide] = useState('')

  const {userData} = useSelector((state)=>state.user)
  const {username} = userData;
  
  return (
    <>
      <div className="bg-base-300 flex justify-end">
        <div className={hide}>
          {username == props.ownerName ? <button type="button" className=" ml-4 my-1 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={() => { props.socket.current.emit("start_timer", props.roomname); setHide("hidden") }} >Start Battle</button>
            : null}
        </div>
        <div className="ml-4  flex  items-center bg-gray-900 pl-1 rounded-md">
          <span className="text-2xl pb-1 pt-1 "> <MdTimer /></span>
          <span className="countdown font-mono text-2xl p-2 ">
            <span style={{ "--value": props.timer.h }}></span>:
            <span style={{ "--value": props.timer.m }}></span>:
            <span style={{ "--value": props.timer.s }}></span>
          </span>
        </div>
        <div className="ml-4 my-1">
          <select
            className="p-2 rounded-lg w-full"
            value={size}
            onChange={(e) =>  setSize(parseInt(e.target.value)) }
          >
            <option value="">Font Size</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>

          </select>
        </div>
        <div className="ml-4 my-1">
          <select
            className="p-2 rounded-lg w-full"
            value={theame}
            onChange={(e) => settheame(e.target.value)}
          >
            <option value="">Theme</option>
            <option value="github">github</option>
            <option value="cobalt">cobalt</option>
            <option value="dracula">dracula</option>
            <option value="xcode">xcode</option>

          </select>
        </div>
        <div className="ml-4 my-1 mr-4">
          <select
            className="p-2 rounded-lg w-full"
            value={props.lang}
            onChange={ props.setlangHandler}
          >
            <option value="">Language</option>
            <option value="java">java</option>
            <option value="javascript">javascript</option>
            <option value="cpp">Cpp</option>
            <option value="python">Python</option>

          </select>
        </div>
      </div>
      <div >
        <AceEditor
          mode={props.lang}
          theme={theame}
          name="CodeMirror"
          id="CodeMirror"
          onChange={props.getCodeHandler}
          showPrintMargin={false}
          fontSize={size}
          value={props.code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }} />

      </div>
    </>
  );



  

};

export default AceEditors;
