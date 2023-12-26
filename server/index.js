import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import expenseRoutes from './routes/expenses.js';
import userRoutes from './routes/users.js';

const app= express();





app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

app.use('/expenses',expenseRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL= 'mongodb+srv://shravankumarpatil9:My9HxBriyoYtWVGJ@shravancluster1.oheyn9v.mongodb.net/ShravanDatabase?retryWrites=true&w=majority'
//Used mongoDB cloud atlas

const PORT= process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);

