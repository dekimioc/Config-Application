import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ConfigurationPage from './pages/ConfigurationPage/ConfigurationPage';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LogInForm from './components/Forms/LogInForm/LogInForm';
import RegistrationForm from './components/Forms/RegistrationForm/RegistrationForm';
import AddNewConfig from './pages/AddNewConfig/AddNewConfig';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loged'));
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorLog, setErrorLog] = useState(false);
  const [data, setData] = useState([]);

  const logOut = () => {
    // history.push("/");
    localStorage.removeItem('loged');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }
  // LOG IN FORM REQUEST
  const logIn = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_SWAGGER_API}login`, {
      email: email,
      password: pass
    })
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem('loged', true);
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true);
          setData(response.data)
          setErrorLog(false);

        }
      }).then(() => {
      })
      .catch(function (error) {
        console.log(error);
        setErrorLog(true);
      });
  }
  // LOGIN MAIL HANDLER 
  const logInMailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  // LOGIN PASSWORD HANDLER
  const logInPassHandler = (e) => {
    setPass(e.target.value);
    console.log(e.target.value);
  }

  return (
    <main className="App">
      <Header logedOut={logOut} isLogedUser={isLoggedIn} />

      <BrowserRouter>
        <Route exact path="/">
          {isLoggedIn ?
            <Redirect to="/configurations" /> :
            <Home>
              <LogInForm
                submitHandler={(e) => logIn(e)}
                emailValue={email}
                emailHandler={(e) => logInMailHandler(e)}
                passwordValue={pass}
                passwordHandler={(e) => logInPassHandler(e)}
              />
              <RegistrationForm

              />
            </Home>}
        </Route>
        <Route path="/configurations">{!isLoggedIn ? <Redirect to="/" /> : <ConfigurationPage />}</Route>
        <Route path="/add-new">{!isLoggedIn ? <Redirect to="/" /> : <AddNewConfig />}</Route>
      </BrowserRouter>
    </main>
  );
}

export default App;
