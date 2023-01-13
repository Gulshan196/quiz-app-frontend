import React, { useEffect, useRef, useState } from 'react'
import { Question } from './Question'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Profile = ({ setToken }) => {

    const count = useRef(1);
    const navigate = useNavigate();
    const [user, setUser] =useState('');

    let token = JSON.parse(localStorage.getItem('token'));

    async function fetchData() {
        let url = 'https://quiz-app-six-iota.vercel.app/profile';
        await axios(url, {
            method: "get",
            headers: { "Authorization": "Bearer " + token },
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data.username));
        }).catch((err) => {
            console.log(err);
        })
        setName();
    }
    const setName = () => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }

    useEffect(() => {
        fetchData();
    }, [token])

    return (
        <>
            <div className='row align-items-center justify-content-center' style={{ minHeight: '96vh' }}>
                <div className="card col mt-5">
                    <div className="card-body">
                        <h5 className="card-title row">
                            <div className="row mt-3 justify-content-between">
                                <h5 className='col-sm-10'>Student Name : {user}</h5>
                                <h5 className='col-sm-1'><button className='btn btn-outline-dark' onClick={() => {
                                    setToken(null);
                                    localStorage.clear();
                                    navigate('/login');
                                }}>Logout</button></h5>
                            </div>
                        </h5>
                        <Question count={count.current} />
                    </div>
                </div>
            </div>
        </>
    )
}
