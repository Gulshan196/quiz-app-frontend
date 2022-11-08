import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

export const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const roleRef = useRef();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (roleRef.current.value === 'admin') {
            console.log(roleRef.current.value);
            adminLogin();
        } else {
            studentLogin();
        }

        return true;
    }
    const studentLogin = async () => {
        setLoading(true);
        let url = 'https://quiz-app-gulshan.herokuapp.com/auth/user/login';
        await axios(url, {
            method: "post",
            data: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data.access_token));
        }).catch((err)=>{
            console.log('username or password mismatch',err);
        })
        let token = JSON.parse(localStorage.getItem('token'));
        setToken(token);
        setLoading(false);
        if (token) {
            console.log('token', token);
            navigate('/')
        }
        else {
            alert('unauthorized access');
        }
    }

    const adminLogin = async () => {
        setLoading(true);
        let url = 'https://quiz-app-gulshan.herokuapp.com/auth/admin/login';
        await axios(url, {
            method: "post",
            data: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data.access_token));
        }).catch((err)=>{
            console.log('username or password mismatch',err);
        })
        let token = JSON.parse(localStorage.getItem('token'));
        setToken(token);
        setLoading.current = false;
        if (token) {
            console.log('token', token);
            navigate('/admin')
        }
        else {
            alert('unauthorized access');
        }
    }

    const Loading = () =>{
        return (
            <div><Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner></div>
        )
    }

return (
    
    <div>
        {loading === true ? <Loading/> :
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" onChange={(e) => setUsername(e.target.value)} required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="role" className="col-sm-2 col-form-label">User Role</label>
                <div className="col-sm-10">
                    <select className="form-select" ref={roleRef} id="role" aria-label="Default select example" required>
                       
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
            <span> OR</span>
            <Link to='/' className="btn btn-outline-primary ms-2">Create new Account</Link>
        </form>
}
    </div>

)
}
