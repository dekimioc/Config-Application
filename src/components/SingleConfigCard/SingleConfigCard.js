import React from 'react';
import { Link } from 'react-router-dom';

import './SingleConfigCard.scss';

const SingleConfigCard = ({ link, name, version }) => {
    return (
        <div className="col-4 single-card" to={link}>
            <h3>{name}</h3>
            <p>{version}</p>
            <Link to={link}>View Config</Link>
        </div>
    )
};

export default SingleConfigCard;