import React from 'react'
import { useNavigate } from 'react-router-dom';

const SuccessfullyCreatedPage = () => {
    
    const navigate = useNavigate();

    const logIn = () => {
        navigate('/');
    }
    

    return (
        <h1 className='text-green-600 text-4xl text-center font-bold mt-20 mb-8'>
            Successfully created account proceed to log in!
            <div>
            <button className='btnGreenWhite my-2' onClick={logIn}>
                Proceed
            </button>
            </div>
        </h1>
    )
}

export default SuccessfullyCreatedPage