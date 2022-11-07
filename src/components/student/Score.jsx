import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Score = ({setToken}) => {
    const location = useLocation();
    const navigate= useNavigate();

    return (
        <div className='row mt-5 align-items-center justify-content-center' style={{ minHeight: '90vh' }}>
            <div className="card col-4">
                <div className="card-body">
                    <h1> Your Total Score : {location.state}</h1>
                    <h5 className='col-2'><button className='btn btn-primary' onClick={() => {
                        setToken(null);
                        localStorage.clear();
                        navigate('/login');
                    }}>Logout</button></h5>
                </div>
            </div>
        </div>
    )
}