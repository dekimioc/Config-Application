import React, { useState } from 'react';
import './Home.scss';

const Home = ({ ...props }) => {
    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);

    const loginFormToggler = (props) => {
        setLoginFormVisible(!loginFormVisible);
        setRegisterFormVisible(false);
    }

    const registerFormToggler = () => {
        setRegisterFormVisible(!registerFormVisible);
        setLoginFormVisible(false);
    }

    return (
        <section className="container mt-5 pt-5" id="home">
            <div className="row mt-5 pt-5">
                <div className="col-12 mt-5 pt-5">
                    <h1>Welcome to the Configurator Application</h1>
                    <p>Easily Create and Edit configuration file with this app!</p>
                </div>
                <div className="col-6 mt-5">
                    <p className="login-button" onClick={loginFormToggler}>Log In</p>
                    {loginFormVisible ?
                        props.children[0]
                        : null}

                </div>
                <div className="col-6 mt-5">
                    <p className="login-button" onClick={registerFormToggler}>Register</p>
                    {registerFormVisible ? props.children[1] : null}

                </div>
            </div>
            <div>
            </div>
        </section>
    )
};

export default Home;