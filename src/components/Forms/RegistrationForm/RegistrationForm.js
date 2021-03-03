import React, { useState } from 'react';
import axios from 'axios';

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
        setConfirmPassword(e.target.value)
    }

    const bodyParameters = {
        email: `${email}`,
        password: `${password}`,
        password2: `${confirmPassword}`
    };

    const sendRegistration = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords are not matching!");
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
                console.log(error);
                if (error.response) {
                    if (error.response.status === 403) {
                        messageError("User already exists");
                    } else {
                        messageError("Unexpected error!");
                    }
                }
            });
    }

    return (
        <form onSubmit={(e) => sendRegistration(e)}>
            <input type="email" placeholder="Email" value={email} onChange={e => emailHandler(e)} />
            <input type="password" placeholder="Password" value={password} onChange={e => passwordHandler(e)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => passwordConfirmHandler(e)} />
            <input type="submit" value="Submit" />
            <p>{messageError}</p>
            <p>{messageOk}</p>
        </form>
    )
};

export default RegistrationForm;