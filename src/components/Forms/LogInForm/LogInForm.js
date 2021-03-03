import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './LogInForm.scss';

const LogInForm = ({ emailValue, emailHandler, passwordValue, passwordHandler, submitHandler }) => {
    return (
        <form className="login-form" onSubmit={(e) => submitHandler(e)}>
            <input type="email" placeholder="Your Email" value={emailValue} onChange={(e) => emailHandler(e)} />
            <input type="password" placeholder="Your Password" value={passwordValue} onChange={(e) => passwordHandler(e)} />
            <input type="submit" value="Log In" />
        </form>
    )
};

export default LogInForm;