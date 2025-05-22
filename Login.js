import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import the CSS file for styling
import axiosintance from './axiosintance';

const Login = () => {

    const [user, setuser] = useState({ email: "", password: "" })
    var mynavigate = useNavigate();

    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const submitdata = (e) => {
        e.preventDefault()
        var myformdata = new FormData()
        myformdata.append("user_email", user.email)
        myformdata.append("user_password", user.password)

        axiosintance.post("api-login.php", myformdata)
            .then(res => {
                console.log(res.data)
                
                localStorage.setItem("user_id", res.data.user_id)
                               
                if (res.data.flag === "1") {
                    toast.success(res.data.message);
                    setTimeout(() => {
                        mynavigate("/list");
                    }, 4000);

                }else{  toast.error(res.data.message);  }
            })

            .catch((err) => alert(err))
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            <form onSubmit={submitdata} className="login-form">
                <label className="login-label">Email:</label>
                <input 
                    type='text' 
                    placeholder='Enter Email' 
                    name='email' 
                    onChange={handlechange} 
                    className="login-input" 
                /><br/>

                <label className="login-label">Password:</label>
                <input 
                    type='password' 
                    placeholder='Enter Password' 
                    name='password' 
                    onChange={handlechange} 
                    className="login-input" 
                /><br/>
                
                <div className="d-flex justify-content-center">
                  <button  type="submit" data-mdb-button-init
                    data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                </div>
                {/* <input 
                    type='submit' 
                    value="Submit" 
                    className="login-submit-btn" 
                /> */}
                <br/>

            </form>

            <div className="login-links">
                <p>Click to Login with <Link to='/otplogin' className="login-link">OTP</Link></p>
                <p>If you have no account, click to <Link to='/register' className="login-link">Register</Link></p>
            </div>
           

            <ToastContainer />
        </div>
    )
}

export default Login
