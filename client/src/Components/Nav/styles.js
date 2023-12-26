import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },

  heading: {
    color: '#7a6ff0',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },


  image: {
    marginLeft: '50px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '350px',
  },

  userName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '200px',

  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  pointer: {
    cursor: 'pointer',
    animation: '$wiggle 1s infinite',
  },

  '@keyframes wiggle': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '50%': {
      transform: 'rotate(3deg)',
    },
    '100%': {
      transform: 'rotate(-3deg)',
    },
  },
  logout: {
    // Add popout effect
    transform: 'scale(1)',
    transition: 'transform 0.3s ease',

    '&:hover': {
      // Apply popout effect on hover
      transform: 'scale(1.1)',
      boxShadow: '0 0 10px 5px rgba(255, 0, 0, 0.5)', // Apply glow effect on hover

    },
  },

  signin: {
    // Add popout effect
    transform: 'scale(1)',
    transition: 'transform 0.3s ease',

    '&:hover': {
      // Apply popout effect on hover
      transform: 'scale(1.1)',
      boxShadow: '0 0 10px 5px rgba(0, 0, 255, 0.5)', // Apply glow effect on hover

    },
  },
  btngrp:{
    // Add popout effect
    transform: 'scale(1)',
    transition: 'transform 0.3s ease',

    '&:hover': {
      // Apply popout effect on hover
      transform: 'scale(1.1)',
      boxShadow: '0 0 10px 5px rgba(0, 0, 150, 0.5)', // Apply glow effect on hover

    },
  },

  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: '#fff',
    fontSize: '14px',
  },

 
}));