import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRooms } from "../store/dataSlice";

const Welcome = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRooms())
    // dispatch(resetMyRoom())
  }, [])
  
  return (
    <div className="flex h-screen items-center justify-center" >
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to CodeBattle</h1>
        <p className="text-lg font-semibold">Solve coding challenges and compete with others</p>
        <div className="my-4 mx-2">
          <Link to='/create'>
            <button className="btn btn-active btn-info mx-2">
              Create Room
            </button>
          </Link>
          <Link to='/rooms' >
            <button  className="btn btn-active btn-info ">
              Join Room
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
