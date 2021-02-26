import React from 'react';
import axios from 'axios';

import './LogInForm.scss';

const LogInForm = () => {
    // const logIn = (e) => {
    //     e.preventDefault();
    //     axios.post('https://l5ov8zep98.execute-api.us-west-2.amazonaws.com/api/login', {
    //         email: email,
    //         password: pass
    //     })
    //         .then(function (response) {
    //             if (response.status === 200) {
    //                 localStorage.setItem('loged', true);
    //                 localStorage.setItem('token', response.data.token);
    //                 setIsLoggedIn(true);
    //                 setData(response.data)
    //                 setErrorLog(false);

    //             }
    //         }).then(() => {
    //             history.push("/configurations");
    //             // getData();
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             setErrorLog(true);
    //         });
    // }

    // const logInMailHandler = (e) => {
    //     setEmail(e.target.value);
    // }
    // const logInPassHandler = (e) => {
    //     setPass(e.target.value);
    // }

    return (
        <form className="login-form">
            <input type="email" placeholder="Your Email" />
            <input type="password" placeholder="Your Password" />
            <input type="submit" value="Log In" />
        </form>
    )
};

export default LogInForm;