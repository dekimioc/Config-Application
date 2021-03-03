import React from 'react';
import './Header.scss';

const Header = ({ logedOut, isLogedUser }) => {

    return (
        <header className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>Logo</p>
                    </div>
                    {isLogedUser ? <div className="col-md-6">
                        <span className="btn text-white" onClick={logedOut}>Log Out</span>
                    </div> : null}


                </div>
            </div>
        </header>
    )
};

export default Header;