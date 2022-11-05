import axios from 'axios';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export const Register = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return alert('password and confirm password does not match');
        }
        else {
            await axios('http://localhost:5000/user/signup', {
                method: "post",
                data: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" }
            }).then((res)=>{
                console.log(res.data);
                alert('registered successfully');
            })
        }
    }
    return (
        <div>  <form>
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
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
            </div>
    
            <button type="submit" onClick={handleSubmit} className="btn btn-primary" >Sign Up</button>
            <Link to='/login' className="btn btn-outline-primary ms-2">Sign in</Link>
        </form></div>
    )
}