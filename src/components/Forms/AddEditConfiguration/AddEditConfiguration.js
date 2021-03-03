import React, { useState } from 'react';
import axios from 'axios';

const AddNewConfigForm = () => {
    const [configName, setConfigName] = useState('');
    const [configVersion, setConfigVersion] = useState('');
    const [jsonValue, setJsonValue] = useState('');
    const [isJsonParsa, setIsJsonPars] = useState(true);

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

    console.log(bodyParameters);

    const setData = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SWAGGER_API}config`, bodyParameters, config)
            .then(function (response) {
                if (response.status === 201) {
                    // succesSuccesRequest("Success!");
                    setIsJsonPars(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 409) {
                        // setErrorRequest("Configuration with same name and version exist. Change config version!")
                    }
                    if (error.response.status === 400) {
                        // setErrorRequest("Bad request")
                    }
                    if (error.response.status === 401) {
                        // setErrorRequest("Authorization information is missing or invalid.")
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
        } else {
            setIsJsonPars(false);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form onClick={e => setData(e)}>
                        <input type="text" placeholder="Config Name" value={configName} onChange={e => setConfigName(e)} />
                        <input type="text" placeholder="Config Version" value={configVersion} onChange={e => setConfigVersion(e)} />
                        <input type="textarea" placeholder="Config" value={jsonValue} />
                        <p className="check-button" onClick={checkJson}>Check</p>
                        <input type="submit" value="Add new Config" />
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AddNewConfigForm;