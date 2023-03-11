import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCode, runCode, STATUSES } from "../../store/codeSlice";
import LoaderSpinner from "../LoaderSpinner";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [stdout, setStdout] = useState("");
  const [runtime, setRuntime] = useState("");
  const [output, setOutput] = useState("");
  const [expected, setExpected] = useState("");
  const [compile_error, setcompile_error] = useState("");
  const [full_compile_error, setfull_compile_error] = useState("");

  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { input: myInput, titleSlug, language, mycode, qid, myoutput, status: loadingStatus } = useSelector((state) => state.code)



  useEffect(() => {
    if (myoutput.std_output || myoutput.status_msg || myoutput.elapsed_time || myoutput.full_compile_error || myoutput.compile_error) {
      setStdout(myoutput.std_output)
      setStatus(myoutput.status_msg)
      setRuntime(myoutput.elapsed_time)
      setfull_compile_error(myoutput.full_compile_error)
      setcompile_error(myoutput.compile_error)

      if (myoutput.code_answer) {
        var otp = ""
        myoutput.code_answer.forEach(element => {
          otp += element + '\n';
        })
        setOutput(otp)
      }
      if (myoutput.expected_code_answer) {
        var eotp = ""
        myoutput.expected_code_answer.forEach(element => {
          eotp += element + '\n';
        })
      }
      setExpected(eotp);
    }

  }, [myoutput])


  const submit = () => {
    dispatch(submitCode(titleSlug, mycode, myInput, language, qid))
    setInput(myInput);

  };

  const run = () => {
    dispatch(runCode(titleSlug, mycode, myInput, language, qid))
    setInput(myInput);
  };



  if (loadingStatus === STATUSES.LOADING) {
    return (

      <div className="bg-gray-700 p-4 rounded-lg text-white align-middle text-center h-[500px] ">
        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 mt-[100px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    )
  }

  // console.log(correct_answer)
  return (
    <div className="container ">
      <div className="bg-gray-700 p-4 rounded-lg text-white h-[100%] flex flex-col justify-between">


        {myoutput.compare_result !== null && (
          <>
            {myoutput.status_msg != null && <p className={myoutput.correct_answer ? 'text-green-400 text-lg font-bold' : 'text-red-400 text-lg font-bold'}>
              {myoutput.correct_answer ? status : "Wrong Answer"} <span className="ml-2">Runtime: {runtime}ms</span>
            </p>}
            <div className="p-3 border border-gray-500" style={{ whiteSpace: "pre-wrap" }}>
              <h4 className="font-bold">Input:</h4>
              {compile_error ?
                <div className="p-2 border border-gray-300 text-red-500 font-bold">
                  {compile_error}
                </div>
                : <div className="p-2 border border-gray-300">
                  {input}
                </div>}

              <h4 className="font-bold mt-3">Output:</h4>
              <div className="p-2 border border-gray-300">
                {output}
              </div>

             {myoutput.expected_code_answer!=null&&<>
              <h4 className="font-bold mt-3">Expected Output:</h4>
              <div className="p-2 border border-gray-300">
                {expected}
              </div>
             </>}
              {myoutput.total_correct != null &&
                <>
                  <h4 className="font-bold mt-3">Testcases:</h4>
                  <div className="p-2 border border-gray-300">
                    {myoutput.total_correct}/{myoutput.total_testcases}
                  </div>
                </>
              }
              {myoutput.runtime_percentile && <>
                <h4 className="font-bold mt-3">Faster Then:</h4>
                <div className="p-2 border border-gray-300">
                  {myoutput.runtime_percentile}%
                </div>
              </>
              }
              {stdout && stdout[0].length > 0 && (
                <div>
                  <h4 className="font-bold mt-3">stdout:</h4>
                  <div className="p-2 border border-gray-300">
                    {stdout}
                  </div>
                </div>
              )}
            </div>

          </>
        ) }

{/* 
: (<div>
          <p className={myoutput.total_correct === myoutput.total_testcases ? 'text-green-400 text-lg font-bold' : 'text-red-400 text-lg font-bold'}>
            {myoutput.total_correct === myoutput.total_testcases ? "Accepted" : "Wrong Answer"} <span className="ml-2">Runtime: {myoutput.status_runtime}</span>
          </p>



        </div>)} */}
        <div className="flex  mt-4">
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-white mr-4" onClick={submit}>
            Submit
          </button>
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-white" onClick={run}>
            Run
          </button>
        </div>
      </div>

    </div>
  );
};

export default Terminal;
