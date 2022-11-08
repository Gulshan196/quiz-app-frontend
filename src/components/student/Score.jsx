import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Chart from './Chart';

export const Score = ({setToken}) => {
    const location = useLocation();
    const navigate= useNavigate();

    return (
        <div className='row mt-5 align-items-center justify-content-center' style={{ minHeight: '90vh' }}>
            <div className="card col-md-8 col-lg- col-sm-auto">
                <div className="card-body row">
                    <div className='col-xm-auto'>
                        <h1> Your Total Score : {location.state}</h1>
                        <Chart />
                    </div>
                    <div className='col-xm-auto'>
                        <div className='row'>
                            <h5 className='col-sm-12'><button className='btn btn-primary' onClick={() => {
                                setToken(null);
                                localStorage.clear();
                                navigate('/');
                            }}>Logout</button></h5>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}