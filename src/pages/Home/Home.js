import React, { useState } from 'react';
import './Home.scss';
import LogInForm from '../../components/Forms/LogInForm/LogInForm';

const Home = () => {
    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);

    const loginFormToggler = () => {
        setLoginFormVisible(!loginFormVisible);
        setRegisterFormVisible(false);
    }

    const registerFormToggler = () => {
        setRegisterFormVisible(!registerFormVisible);
        setLoginFormVisible(false);
    }

    return (
        <section className="container" id="home">
            <div className="row">
                <div className="col-12">
                    <h1>Welcome to the Configurator Application</h1>
                    <p>Easily Create and Edit configuration file with this app!</p>
                </div>
                <div className="col-6">
                    <p onClick={loginFormToggler}>Log In</p>
                    {loginFormVisible ? <LogInForm /> : null}

                </div>
                <div className="col-6">
                    <p onClick={registerFormToggler}>Register</p>
                    {registerFormVisible ? <p>Register Form</p> : null}

                </div>
            </div>
            <div>
            </div>
        </section>
    )
};

export default Home;