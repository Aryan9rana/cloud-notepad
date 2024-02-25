import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
export default function Login(props) {
    const [credentials, setCredetials] = useState({email:"", password:""});
    let navigate= useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
         const response= await fetch(`http://www.localhost:80/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body:JSON.stringify({email:credentials.email, password: credentials.password})
          });
          const json= await response.json();
          console.log(json);
          if(json.success===true){
            localStorage.setItem('token', json.authToken);
            navigate("/");
        }
        else {
              props.showAlert("danger", "login failed enter correct credentails")
          }
    }
const onChange=(e)=>{
    setCredetials({...credentials,[e.target.name]:e.target.value});
}
    return (
        <div className='container'>
            <h1 className='text-center my-3'>Sign in to your account</h1>
<form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="text-center">
            <p>Not a member? <Link to="/signup">Register</Link></p> </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
