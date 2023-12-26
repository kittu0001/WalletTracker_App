import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import Moment from 'react-moment' ;
import {getExpenses} from '../../Actions/expenses';
import CategoryGraph from './CategoryGraph';
import { Typography ,Grid,Card,CardContent} from "@material-ui/core";
import useStyles from './styles';
import WeekGraph from './WeekGraph';
const Report = () => {
    const classes= useStyles();
    const expenses= useSelector((state)=> state.expenses);
    const dispatch= useDispatch();
    const [categoryTotal , setCategoryTotal]= useState();
    const [weekTotal, setWeekTotal]= useState();


    useEffect(()=>{
        dispatch(getExpenses());
        console.log(expenses);
    },[]);
    useEffect(()=>{
        divideCategory();
        divideWeek();

    },[expenses])

    const divideCategory = ()=>{
        const cat=[{name:'Food' , value:0 },{name:'Fuel' , value:0 },{name:'Shopping' , value:0 },{name:'Home' , value:0 },{name:'other' , value:0 }]
        const currentMonth= new Date().getMonth();
        for(let i= 0; i<expenses.length ; i++ ){
            const month= new Date(expenses[i].dateTime).getMonth();
            if(month ===currentMonth){
                for(let j=0; j<cat.length ; j++){
                    if(expenses[i].category===cat[j].name)
                        cat[j].value=cat[j].value+ expenses[i].amount;
                }
            }
        }
        setCategoryTotal(cat);
    }

    const divideWeek = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
      
        const weeks = [];
      
        // first day of the current month i.e june
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      
        // last day of the current month i.e june
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      
        let startDate = 1;
        let endDate = 7;
      
        const firstWeek = {
          startDate: 1,
          // since there are only 3 days for week 1 in june month, modify the code as per week 1 days 
          // if your implementation month is other month. 
          endDate: Math.min(3, lastDayOfMonth.getDate()),  
          value: 0,
          name: 'Week 1'
        };
      
        weeks.push(firstWeek);
      
        startDate = firstWeek.endDate + 1;
        endDate = startDate + 6;
      
        while (startDate <= lastDayOfMonth.getDate()) {
          const week = {
            startDate,
            endDate: Math.min(endDate, lastDayOfMonth.getDate()),
            value: 0,
            name: `Week ${weeks.length + 1}`
          };
          
          weeks.push(week);
      
          startDate = endDate + 1;
          endDate = startDate + 6;
        }

        
      
        for (let i = 0; i < expenses.length; i++) {
          const expenseDate = new Date(expenses[i].dateTime);
      
          if (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          ) {
            for (let j = 0; j < weeks.length; j++) {
              const { startDate, endDate } = weeks[j];
      
              if (
                expenseDate.getDate() >= startDate &&
                expenseDate.getDate() <= endDate
              ) {
                weeks[j].value += expenses[i].amount;
              }
            }
          }
        }
      
        setWeekTotal(weeks);
      };
      
    return (
        <div>

            <Grid container>

            <Grid item  xs={12} md={6} className={classes.mainContainer} >
            <Typography variant="h3" gutterBottom>Reports</Typography>
            <CategoryGraph categoryTotal={categoryTotal}/>
            <Typography variant="caption" gutterBottom>categories spending (monthly)</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.mainContainer}>
            <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            <Typography variant="caption" gutterBottom>Your expenses on a weekly basis this month</Typography>
            <WeekGraph weekTotal={weekTotal} />
            </CardContent>
            </Card>
            </Grid>
            </Grid>

        </div>
    );
}

export default Report

