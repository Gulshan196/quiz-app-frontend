import axios from 'axios';
import React, {  useState,useEffect,useRef } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom';
import { Question } from './Question'

export const Profile = ({setToken}) => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const count = useRef(1);
    // const location = useLocation();

    let token = JSON.parse(localStorage.getItem('token'));
    const [userName,setUserName] =  useState();

    async function fetchData() {
        await axios('http://localhost:5000/profile', {
            method: "get",
            headers: { "Authorization": "Bearer " +token } ,
        }).then((res)=>{
            console.log(res.data);
            localStorage.setItem('user',JSON.stringify(res.data.username));
        }).catch((err)=>{
            console.log(err);
        })

        setUser();
    }

       useEffect(()=>{
        fetchData();
       },[])


       function setUser(){
        setUserName(JSON.parse(localStorage.getItem('user')));
       }
       

    return (
        <>
            <div className='row align-items-center justify-content-center m-5'>
                <div className="card mt-5">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div className="row mt-3 justify-content-between">
                                <h5 className='col-2' >Student Name : {userName}</h5>
                                <h5 className='col-2'><button className='btn btn-outline-primary' onClick={() => {
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
