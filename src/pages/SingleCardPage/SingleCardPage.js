import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

import Loader from '../../components/Loader/Loader';
import './SingleCardPage.scss';
import copyIcon from '../../assets/imgs/copy.png';


const SingleCardPage = ({ match }) => {
    const [configName, setConfigName] = useState("");
    const [configVersion, setConfigVersion] = useState("");
    const [newConfigVersion, setNewConfigVersion] = useState("");
    const [newConfigName, setNewConfigName] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setNewName] = useState(match.params.name);
    const [version, setNewVersion] = useState(match.params.version);
    const [jsonValue, setJsonValue] = useState('');
    const [isJsonParsa, setIsJsonPars] = useState(false);
    const [errorRequest, setErrorRequest] = useState('');
    const [succesRequest, succesSuccesRequest] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SWAGGER_API}config/${name}?version=${version}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(function (response) {
                // handle success
                setConfigName(response.data.config_name);
                setNewConfigName(response.data.config_name);
                setConfigVersion(response.data.config_version);
                setNewConfigVersion(response.data.config_version);
                setJsonValue((response.data.data.test));
                setIsLoaded(true);
                checkJson(response.data.data.test);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])

    const config = {
        headers: { Authorization: localStorage.getItem('token') },
    }
    const bodyParameters = {
        email: `${localStorage.getItem('email')}`,
        password: `${localStorage.getItem('pass')}`,
        name: `${newConfigName}`,
        version: `${newConfigVersion}`,
        data: {
            "test": `${jsonValue}`
        }
    };

    const setData = (e) => {
        if (!configName) {
            setMessage("You must enter config name!")
            return
        }
        if (!configVersion) {
            setMessage("You must enter version!")
            return;
        }
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SWAGGER_API}config`, bodyParameters, config)
            .then(function (response) {
                if (response.status === 201) {
                    succesSuccesRequest("Success!");
                    setIsJsonPars(true);
                    setTimeout(() => { history.push("/"); }, 2000);
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 409) {
                        setErrorRequest("Configuration with same name and version exist. Change config version!")
                    }
                    if (error.response.status === 400) {
                        setErrorRequest("Bad request")
                    }
                    if (error.response.status === 401) {
                        setErrorRequest("Authorization information is missing or invalid.")
                    }
                    if (error.response.status === 500) {
                        setErrorRequest("Unexpected Error!")
                    }
                }
            });
    }

    var isJsonParsable = string => {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }

    const changeJson = (e) => {
        setJsonValue(e.target.value);
        checkJson(jsonValue);
        setIsJsonPars(false);
        setErrorRequest("")
    }

    const checkJson = (json) => {
        if (isJsonParsable(json)) {
            setIsJsonPars(true);
        } else {
            setIsJsonPars(false);
        }
    }

    const changeConfigNameHandler = (e) => {
        setNewConfigName(e.target.value);
    }

    const changeConfigVersionHandler = (e) => {
        setNewConfigVersion(e.target.value);
        setErrorRequest("");
    }

    const copyToClipBoard = async copyMe => {
        console.log(copyMe)
        try {
            await navigator.clipboard.writeText(copyMe.target.previousElementSibling.innerText);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };

    return (

        <div className="row mt-5 pt-5 mb-5 pb-5">
            <div className="col-12">
                <h1 className="mb-5">Edit Configuration</h1>
            </div>
            { isLoaded ?
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <h2 className="text-left">Name: <span>{configName}</span></h2>
                    <h2 className="text-left">Version: <span>{configVersion}</span></h2>
                    <h3 className="text-left mb-5">Configuration:</h3>
                    <div className="form-style">
                        <form onSubmit={(e) => setData(e)}>
                            <label className="text-left">Name</label>
                            <input className="mb-3" placeholder="Config Name" type="text" value={newConfigName.replace(/ /g, '')} onChange={e => changeConfigNameHandler(e)} />
                            <label className="text-left">Version</label>
                            <input className="mb-3" type="number" value={newConfigVersion} onChange={e => changeConfigVersionHandler(e)} />
                            <label className="text-left">Configuration</label>
                            <textarea placeholder="Config Version" cols="30" rows="20" value={jsonValue} onChange={e => changeJson(e)}></textarea>
                            {isJsonParsa ? <p className="config-ok">Config is ok!</p> : <p className="config-not-ok">Confing is not ok!</p>}
                            <div>
                                <p className="check-button" onClick={json => checkJson(jsonValue)}>Check Config</p>
                                {isJsonParsa ? <input className="check-button" type="submit" value="Submit" /> : null}
                            </div>

                        </form>
                    </div>
                    {errorRequest ? <div className="error-form mb-3 mt-3"><span>{errorRequest}</span></div> : null}
                    {succesRequest ? <div><span className="config-ok">{succesRequest}</span></div> : null}
                    {message ? <p>{message}</p> : null}
                </div> : <Loader />}

            <div className="col-lg-6 col-md-6 col-sm-12 col-12 preview-json">
                {jsonValue.split(",").map((e, i) => <div key={i} className="d-flex copy-el"><p className="copy-el" >{e},</p><img className="img-copy" onClick={(copyMe) => copyToClipBoard(copyMe)} src={copyIcon} /></div>)}
            </div>
        </div>
    )
};

export default SingleCardPage;