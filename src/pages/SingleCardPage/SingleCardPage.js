import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [isJsonParsa, setIsJsonPars] = useState(true);
    const [errorRequest, setErrorRequest] = useState('');
    const [succesRequest, succesSuccesRequest] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

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

    console.log(bodyParameters);

    const setData = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SWAGGER_API}config`, bodyParameters, config)
            .then(function (response) {
                if (response.status === 201) {
                    succesSuccesRequest("Success!");
                    setIsJsonPars(true);
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
        checkJson();
        setIsJsonPars(false);
        setErrorRequest("")

        console.log(e.target.value);
    }

    const checkJson = () => {
        console.log(isJsonParsable(jsonValue));
        if (isJsonParsable(jsonValue)) {
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
        console.log(copyMe);
        try {
            await navigator.clipboard.writeText(copyMe.target.previousElementSibling.innerText);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };

    return (

        <div className="row mt-5 pt-5 mb-5 pb-5">
            { isLoaded ?
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <h2 className="text-left">Name: <span>{configName}</span></h2>
                    <h2 className="text-left">Version: <span>{configVersion}</span></h2>
                    <h3 className="text-left mb-5">Configuration:</h3>
                    <form onSubmit={(e) => setData(e)}>
                        <input className="mb-3" type="text" value={newConfigName} onChange={e => changeConfigNameHandler(e)} />
                        <input className="mb-3" type="text" value={newConfigVersion} onChange={e => changeConfigVersionHandler(e)} />
                        <textarea cols="30" rows="20" value={jsonValue} onChange={e => changeJson(e)}></textarea>
                        {isJsonParsa ? <p className="config-ok">Config is ok!</p> : <p className="config-not-ok">Confing is not ok!</p>}
                        <p className="check-button" onClick={checkJson}>Check</p>
                        {isJsonParsa ? <input className="check-button" type="submit" value="Submit" /> : null}

                    </form>
                    {errorRequest ? <div className="error-form mb-3 mt-3"><span>{errorRequest}</span></div> : null}
                    {succesRequest ? <div><span className="config-ok">{succesRequest}</span></div> : null}
                </div> : <Loader />}

            <div className="col-lg-6 col-md-6 col-sm-12 col-12 preview-json">
                {jsonValue.split(",").map(e => <div className="d-flex copy-el"><p className="copy-el" >{e},</p><img className="img-copy" onClick={(copyMe) => copyToClipBoard(copyMe)} src={copyIcon} /><span>{copySuccess}</span></div>)}
            </div>
        </div>
    )
};

export default SingleCardPage;