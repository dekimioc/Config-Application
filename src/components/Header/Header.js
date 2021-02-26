import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>Logo</p>
                    </div>
                    <div className="col-md-6">
                        <span className="">Register</span>
                        <span className="">Log In</span>
                    </div>
                    <div className="col-md-6">
                        <span className="btn">Log Out</span>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;