import React from 'react';
import { Link } from 'react-router-dom';

import './SingleConfigCard.scss';

const SingleConfigCard = ({ link, name, version }) => {
    return (
        <div className="col-lg-4 col-md-6 col-12 col-sm-12 single-card" to={link}>
            <h3>{name}</h3>
            <p><span>Version: </span>{version}</p>
            <Link to={link} className="view-config-button">View Config</Link>
        </div>
    )
};

export default SingleConfigCard;