import React ,{useState} from 'react'
import {Avatar, Button, Paper , Grid , Typography  , Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin , signup} from '../../Actions/auth';
import './Button.css';

const intialState={ firstName: '', lastName:'', email :'', password: '', confirmPassword:''};
const Auth = () => {
    const classes= useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword]= useState(false);
    const [formData , setFormData] = useState(intialState);

    const [isSignup, setIsSignUp]= useState(false);



    const handleShowPassword=()=> setShowPassword((prevShowPassword)=> !prevShowPassword);
    
    
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history));
        } else{
            dispatch(signin(formData, history));
        }
    };
    const handleChange= (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const switchMode= ()=>{
        setIsSignUp((prev)=>!prev);
        setShowPassword(false);
    };
    const googleSuccess= async (res)=>{
        const result = res?.profileObj; 
        const token = res?.tokenId; 
        try{
            dispatch({type:'AUTH', data:{result, token}});
            history.push('/');
        } catch(error){
            console.log(error);
        }
    }
    const googleFailure=()=>{
        console.log("Google Sign In was unsuccessful . Try Again Later");
    }
    return (
    <Container component ="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avater}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">{isSignup? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={(e)=>handleSubmit(e)}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>

                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword}/>
                {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up':'Sign In'}
                </Button>

                <GoogleLogin
                clientId="427169310071-d28iod5anc9anhqkr3rk88i2dns5859k.apps.googleusercontent.com"
                render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />

                <Grid container justify="flex-end">
                    <Grid item>
                        <Button  className="underline-button" onClick={switchMode}>
                            {isSignup? 'Already have an account?    Sign In' : (
        <span>
          Don't have an account?   Sign Up
        </span>
      )}
                        </Button>                        
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
    );
};

export default Auth;
