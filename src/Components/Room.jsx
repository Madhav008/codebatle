import React from 'react';

const Room = (props) => {
    return (

        <div className="card flex w-96 bg-neutral text-neutral-content m-3 ">
            <div className="card-body items-center text-center flex-row justify-between">
                <h2 className="card-title">{props.name}!</h2>
                <div className="badge badge-accent badge-outline">{props.level}</div>
            </div>
            <div className="card-body items-center text-center flex-row justify-between">
                <div className="stat-title">Joined {props.joined}</div>
                <div onClick={props.onJoin} className="btn btn-accent text-white">Join</div>

            </div>
        </div>

    );
};

export default Room;
