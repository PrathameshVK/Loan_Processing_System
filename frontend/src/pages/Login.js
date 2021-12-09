import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {

    const {login}=useAuth();
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState('');
    const history=useNavigate();

    const handleSignup= async (e)=>{
        e.preventDefault();
        try{
            setError("");
            setLoading(true);
            await login();
            history('/');
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div>
            <button onClick={(e)=>handleSignup(e)} >Sign in with google</button>        
        </div>
    )
}
