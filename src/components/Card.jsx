import React from 'react'
import { Login } from './Login';

export const Card = ({setToken}) => {
    return (
        <div className='row align-items-center justify-content-center text-center' style={{ minHeight: '92vh' }}>
            <div className="card bg-light" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h5>Login</h5>
                    <Login setToken={setToken} />
                </div>
            </div>
        </div>
    )
}
