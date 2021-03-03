import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.scss';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messageError, setErrorMessage] = useState('');
    const [messageOk, setMessageOk] = useState('');

    const setEmailAndPasswordToLocalStorage = () => {
        localStorage.setItem('email', email);
        localStorage.setItem('pass', password);
    }

    const emailHandler = e => {
        setEmail(e.target.value);
    }
    const passwordHandler = e => {
        setPassword(e.target.value);
    }
    const passwordConfirmHandler = e => {
        setConfirmPassword(e.target.value);
    }

    const bodyParameters = {
        email: `${email}`,
        password: `${password}`,
        password2: `${confirmPassword}`
    };

    const sendRegistration = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setMessageOk("");
        if (password !== confirmPassword) {
            setErrorMessage("Passwords are not matching!");
            return false
        }
        if (!email || !password || !confirmPassword) {
            setErrorMessage("You must fill all fields!");
            return false
        }
        axios.post(`${process.env.REACT_APP_SWAGGER_API}register`, bodyParameters)
            .then(function (response) {
                if (response.status === 201) {
                    setMessageOk("User is created! Please log in!");
                    setErrorMessage("");
                    setEmailAndPasswordToLocalStorage();
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        setErrorMessage("User already exists");
                    } else {
                        setErrorMessage("Unexpected error!");
                    }
                }
            });
    }

    return (
        <form class="reg-form" onSubmit={(e) => sendRegistration(e)}>
            <label className="text-left mt-3">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={e => emailHandler(e)} />
            <label className="text-left mt-3">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={e => passwordHandler(e)} />
            <label className="text-left mt-3">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => passwordConfirmHandler(e)} />
            <input className="button mt-5" type="submit" value="Submit" />
            {messageError ? <p class="msg-error mt-3">{messageError}</p> : null}
            {messageOk ? <p class="msg-ok mt-3">{messageOk}</p> : null}
        </form>
    )
};

export default RegistrationForm;