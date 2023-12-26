import { Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Redirect.css'; // Import the esisting CSS file

const Redirect = () => {
    const history = useHistory();

    const handleGetStarted = () => {
        history.push('/auth');
    };
    return (
        <div className="redirect-container">
            <Typography variant="subtitle1" className="redirect-message">
            Manage your finances easily and stay on top of your spending with Wallet Tracker...
                
            </Typography>
            <Typography variant="h5" className="redirect-description">
            Sign up or Login now to start tracking your expenses
            </Typography>
            <br></br>
            <button className="redirect-button" onClick={handleGetStarted}>Get Started</button>
        </div>
    );
};

export default Redirect