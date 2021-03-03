import React, { useState } from 'react';
import './Home.scss';
import LogInForm from '../../components/Forms/LogInForm/LogInForm';

const Home = ({ ...props }) => {
    const [loginFormVisible, setLoginFormVisible] = useState(false);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);
    console.log(props.children);

    const loginFormToggler = (props) => {
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
                    {loginFormVisible ?
                        props.children[0]
                        : null}

                </div>
                <div className="col-6">
                    <p onClick={registerFormToggler}>Register</p>
                    {registerFormVisible ? props.children[1] : null}

                </div>
            </div>
            <div>
            </div>
        </section>
    )
};

export default Home;