import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, withRouter } from 'react-router-dom';

import SingleCardPage from '../SingleCardPage/SingleCardPage';
import SingleConfigCard from '../../components/SingleConfigCard/SingleConfigCard';
import Loader from '../../components/Loader/Loader';
import './ConfigurationPage.scss';

const ConfigurationPage = ({ match, }) => {
    const [allData, setAllData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    // GET ALL CONFIGURATIONS WHEN PAGE IS RENDERED
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SWAGGER_API}config`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(function (response) {
                // handle success
                setAllData(response.data);
                console.log(response);
                setIsLoaded(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []
    )

    return (
        <div>

            {isLoaded ?
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-5 mt-5">
                            <h1 className="mb-5">CONFIGURATION</h1>
                            <Link className="add-new-link mb-5 mt-5" to="/add-new">Add New Configuration</Link>
                        </div>
                    </div>
                    <div className="row">
                        {allData.map((el, i) =>

                            <Route key={i} exact
                                path={`${match.path}`}
                                component={() => <SingleConfigCard link={`${match.path}/${el.config_name}/${el.config_version}`}
                                    name={el.config_name} version={el.config_version}
                                />
                                }
                            />)}
                    </div>
                    {/* </div> */}
                    <Route exact path={`${match.path}/:name/:version`} component={SingleCardPage} />
                </div> : <Loader />}
        </div>
    )
};

export default withRouter(ConfigurationPage);