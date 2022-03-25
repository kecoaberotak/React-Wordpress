import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNiceName, setUserNiceName] = useState('');
    const [email, setEmail] = useState('');
    const [logStatus, setLogStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const siteUrl = 'http://localhost:8080/react-wordpress'; 

    let loginData = {};

    const formSubmit = (e) => {
        e.preventDefault();

        loginData = {
            username : username,
            password: password,
        }

        setLoading(true);

        console.log('test');
    };

    useEffect(() => {
        axios.post(`${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    },[loading]);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        console.log('test Username', username);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log('test password', password);
    };

    return (
        <div>
            <Navbar/>
            <form onSubmit={formSubmit} style={{margin: '20px'}}>
                <label className='form-group'>
                    Username:
                    <input type="text" className='form-control' name='username' value={username} onChange={handleUsername}/>
                </label>
                <br />
                <label className='form-group'>
                    Password:
                    <input type="password" className='form-control' name='password' value={password} onChange={handlePassword}/>
                </label>
                <br />
                <button className="btn btn-primary mb-3" type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;