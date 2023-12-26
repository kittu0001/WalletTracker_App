import React from 'react'
import {Card, CardActions, CardContent,Avatar, Typography,Button} from '@material-ui/core'
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {deleteExpense} from '../../../../Actions/expenses'; 
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import Iconic from '../../../Iconic/Iconic';
const Expense = ({expense, handleUpdate}) => {
    const classes= useStyles();
    const dispatch = useDispatch(); 
    const handleDelete=(id)=>{
        dispatch(deleteExpense(id));
    }
    return (
        <Card className={classes.card}>
        <CardContent>
        <div className={classes.header}> 
        <Iconic category={expense.category}/>
  
        <Typography color="textPrimary" variant="body1">{expense.amount} $</Typography>
        <Typography variant="caption"><Moment format="MM/DD/YYYY, hh:mma">{expense.dateTime}</Moment></Typography> 
        
        </div>    
        <Typography className={classes.description} color="textSecondary" variant="caption">{expense.description}</Typography>
        
        </CardContent>
        <CardActions className={classes.actions}>
        <Button size="small" onClick={()=>handleUpdate(expense._id)} color="primary" ><EditIcon/> EDIT</Button>
        <Button size="small" onClick={()=>handleDelete(expense._id)} color="secondary"><DeleteIcon/> DELETE</Button>
        </CardActions>
        </Card>
    )
}

export default Expense
