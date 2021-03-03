import React from 'react';

import './LogInForm.scss';

const LogInForm = ({ emailValue, emailHandler, passwordValue, passwordHandler, submitHandler, errorLog }) => {
    return (
        <form className="login-form" onSubmit={(e) => submitHandler(e)}>
            <label className="text-left mt-3">Your Email</label>
            <input type="email" placeholder="Your Email" value={emailValue} onChange={(e) => emailHandler(e)} />
            <label className="text-left mt-3">Your Password</label>
            <input type="password" placeholder="Your Password" value={passwordValue} onChange={(e) => passwordHandler(e)} />
            <input className="button mt-5" type="submit" value="Log In" />
            {errorLog ? <p className="error-log mt-4">{errorLog}</p> : null}
        </form>
    )
};

export default LogInForm;