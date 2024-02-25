import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
export default function Signup(props) {
    const [credentials, setCredetials] = useState({name:"", email:"", password:"", cpassword:""});
    let navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
         const response= await fetch(`http://www.localhost:80/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({name: credentials.name, email:credentials.email, password: credentials.password})
          });
          const json= await response.json();
          console.log(json);
          if(json.success===true){
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("success", "account created successfully")
        }
        else {
              props.showAlert("danger", "sign up failed")
          }
    }
    const onChange=(e)=>{
        setCredetials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className='container'>
        <h1 className='text-center my-3'>Create an Account</h1>
    <form  onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="nameHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"  required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">confirm password</label>
                        <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required />
                    </div>
                    <div className="text-center">
                <p>Already a member? <Link to="/login">Login</Link></p> </div>
                    <button disabled={credentials.password !== credentials.cpassword}type="submit" className="btn btn-primary">Create Account</button>
                </form>
            </div>
  )
}
