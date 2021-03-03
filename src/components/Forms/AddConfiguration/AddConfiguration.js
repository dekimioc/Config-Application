import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./AddConfiguration.scss";
import copyIcon from '../../../assets/imgs/copy.png';



const AddNewConfigForm = () => {
    const [configName, setConfigName] = useState('');
    const [configVersion, setConfigVersion] = useState('');
    const [jsonValue, setJsonValue] = useState('');
    const [isJsonParsa, setIsJsonPars] = useState(false);
    const [errorRequest, setErrorRequest] = useState('');
    const [succesRequest, succesSuccesRequest] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const history = useHistory();
    const [message, setMessage] = useState("");

    const config = {
        headers: { Authorization: localStorage.getItem('token') },
    }
    const bodyParameters = {
        email: `${localStorage.getItem('email')}`,
        password: `${localStorage.getItem('pass')}`,
        name: `${configName}`,
        version: `${configVersion}`,
        data: {
            "test": `${jsonValue}`
        }
    };

    const setData = (e) => {
        e.preventDefault();
        if (!configName) {
            setMessage("You must enter config name!")
            return
        }
        if (!configVersion) {
            setMessage("You must enter version!")
            return;
        }
        axios.post(`${process.env.REACT_APP_SWAGGER_API}config`, bodyParameters, config)
            .then(function (response) {
                if (response.status === 201) {
                    succesSuccesRequest("Created!");
                    setIsJsonPars(true);
                    setTimeout(() => { history.push("/"); }, 2000);
                }
            })
            .catch(function (error) {
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
                        setErrorRequest("Unexpected error! Please try again!")
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

    const checkJson = () => {
        if (isJsonParsable(jsonValue)) {
            setIsJsonPars(true);
            setShowStatus(true);
        } else {
            setIsJsonPars(false);
            setShowStatus(true);
        }
    }
    const changeJson = (e) => {
        setJsonValue(e.target.value);
        checkJson();
        setErrorRequest("");
        setShowStatus(false);
    }

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe.target.previousElementSibling.innerText);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };

    const configNameHandler = e => {
        setConfigName(e.target.value);
        setMessage("");
    }

    const configVersionHandler = e => {
        setConfigVersion(e.target.value);
        setMessage("");
    }


    return (
        < div className="container" >
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 form-style-add">
                    <form onSubmit={e => setData(e)}>
                        <label className="text-left">Config Name</label>
                        <input className="mb-3" type="text" placeholder="Config Name" value={configName.replace(/ /g, '')} onChange={e => configNameHandler(e)} />
                        <label className="text-left">Config Version</label>
                        <input className="mb-3" type="number" placeholder="Config Version" value={configVersion} onChange={e => configVersionHandler(e)} />
                        <label className="text-left">Configuration</label>
                        <textarea className="mb-3" placeholder="Config" value={jsonValue} onChange={e => changeJson(e)} />
                        {showStatus ? (isJsonParsa ? <p className="config-ok">Config is ok!</p> : <p className="config-not-ok">Confing is not ok!</p>) : null}
                        <p className="check-button" onClick={checkJson}>Check</p>
                        {showStatus && isJsonParsa ? <input className="check-button" type="submit" value="Add new Config" /> : null}

                    </form>

                    <p className="error-msg mt-3">{errorRequest}</p>
                    <p className="succes-msg mt-3">{succesRequest}</p>
                    {message ? <p className="error-msg mt-3">{message}</p> : null}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 preview-json">
                    {jsonValue.split(/\n/).map(e => <div className="d-flex copy-el"><p className="copy-el" >{e}</p><img className="img-copy" onClick={(copyMe) => copyToClipBoard(copyMe)} src={copyIcon} /><span>{copySuccess}</span></div>)}
                </div>
            </div>
        </div >
    )
};

export default AddNewConfigForm;