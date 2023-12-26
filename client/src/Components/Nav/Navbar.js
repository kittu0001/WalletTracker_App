import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Button, Avatar, ButtonGroup } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import decode from 'jwt-decode';
import useStyles from './styles';
import Wallet_logo from '../../Images/Wallet_logo.png'
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';

const Nav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isLogoClicked, setIsLogoClicked] = useState(true);
    const [isProfileVisible, setIsProfileVisible] = useState(false); // New state variable
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {

        setUser(null);
        dispatch({ type: 'LOGOUT' });
        history.push('/auth');
    }

    useEffect(() => {
        const token = user?.token;

        //JWT
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);
    const handleLogoClick = () => {
        if (user) {
            setIsLogoClicked(true);
            setIsProfileVisible(!isProfileVisible);
            history.push('/');
        }
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">


            <div className={classes.brandContainer}>

                <img onClick={handleLogoClick} className={`${classes.image} ${isLogoClicked ? classes.pointer : ''}`} src={Wallet_logo} alt="icon" height="100" />

                <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">Wallet Tracker</Typography>

            </div>
            {user && (
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button className={classes.btngrp} component={Link} to="/">
                        <Tooltip title="Home" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                            <AppsIcon />
                        </Tooltip>
                    </Button>

                    <Button className={classes.btngrp} component={Link} to="/dashboard">
                        <Tooltip title="Dashboard" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                            <DashboardIcon />
                        </Tooltip>
                    </Button>

                    <Button className={classes.btngrp} component={Link} to="/report">
                        <Tooltip title="Reports" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                            <AssessmentIcon />
                        </Tooltip>
                    </Button>
                </ButtonGroup>
            )}
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile} onMouseEnter={() => setIsProfileVisible(true)}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user?.result.name.charAt(0)}
                            </Avatar>
                            {isProfileVisible && (
                                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            )}
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" className={classes.signin} color="primary">SignIn</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    );
}


export default Nav;