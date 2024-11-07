import React from 'react';
import { GridLoader } from "react-spinners";

const Loading = () => {
    return (
        <div
            className="d-flex position-fixed w-full top-0 left-0 bg-shadow-200  bottom-0 vh-100 vw-100 align-items-center justify-content-center">
            <GridLoader size={30} color={'blue'}/>
        </div>
    );
};

export default Loading;
