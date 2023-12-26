import { Card, Grid, Typography  ,CardContent, Chip} from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses,getLastFiveExpenses } from '../../Actions/expenses';
import Graph from './Graph';
import useStyles from './styles';
import Moment from 'react-moment';
import Iconic from '../Iconic/Iconic';

const Dashboard = () => {
    const [total, setTotal]= useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();
    const expenses= useSelector( (state)=> state.expenses);
    const dashBoard= useSelector((state)=>state.dashboard);

    const findTotal= ()=>{
        let tempTotal =  0;
        for(let i= 0 ; i< expenses.length ;i++){
            tempTotal= tempTotal+ expenses[i].amount;
        }
        setTotal(tempTotal);
    }
    useEffect(()=>{
        dispatch(getExpenses());
        dispatch(getLastFiveExpenses());

    },[]) ;
    useEffect(()=>{
        findTotal();
    },[expenses])
    return (
        <Grid container justifyContent="center"> 
        <Grid item  xs={12} md={6} className={classes.mainContainer} >
        <Typography variant="h3" gutterBottom>Dashboard</Typography>
        <Graph expenses={expenses}/> 
        <Typography variant="h5">Your total expenditure is : {total}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.mainContainer}>
            {dashBoard.map((dash)=>
            <Card key={dash._id} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Iconic category= {dash.category}/>
                    <Typography variant="body2">{dash.amount} $</Typography>
                    <Typography variant="caption"><Moment format="MM/DD/YYYY, hh:mma">{dash.dateTime}</Moment></Typography> 
                </CardContent>
            </Card>
            )}
        </Grid>
        </Grid>
        
    );
}


export default Dashboard;