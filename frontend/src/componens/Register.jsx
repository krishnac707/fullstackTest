import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "./../appConfig/index"

const Register = () => {

    const [userData,setUserData] = useState({name:"",email:"",password:"",confirmPassword:"",role:"buyer",pin:"",number:""})
    const router = useNavigate()
    const handleInput = (event) =>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }
    const handleSelect = (event) => {
        setUserData({...userData,[event.target.name]:event.target.value})
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        if(userData.name || userData.email || userData.password || userData.confirmPassword || userData.pin || userData.role || userData.number){
            if(userData.password === userData.confirmPassword){
                try{
                    const response = await api.post("/register",{userData})
                    if(response.data.success){
                        alert(response.data.message)
                        router("/")
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        else{
            alert("all fields are mandetory")
        }
    }



  return (
    <div>
        <form onSubmit={formSubmit}>
            <label>Name : </label><br />
            <input type="text" name="name" onChange={handleInput} /><br />
            <label>Email : </label><br />
            <input type="email" name="email" onChange={handleInput}/><br />
            <label>Password : </label><br />
            <input type="password" name="password" onChange={handleInput}/><br />
            <label>Confirm password : </label><br />
            <input type="password" name="confirmPassword" onChange={handleInput}/><br />
            <label>Roles</label><br />
            <select name="role" onChange={handleSelect}>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
            </select><br />
            <label>Pin</label><br />
            <input type="number" name="pin"onChange={handleInput} /><br />
            <label>Number : </label><br />
            <input type="number" name="number" onChange={handleInput}/><br />
            <input type="submit" value="Register" />
        </form>
    </div>
  )
}

export default Register