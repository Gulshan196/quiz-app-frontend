import React from 'react'
import { Register } from './Register';

export const CardRegister = ({setToken}) => {
    return (
        <div className='row align-items-center justify-content-center text-center' style={{ minHeight: '92vh' }}>
            <div className="card bg-light" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h5>Registration</h5>
                    <Register setToken={setToken}/>
                </div>
            </div>
        </div>
    )
}
