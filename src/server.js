import express from 'express';
import bodyParser from 'body-parser';

import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

const app = express();

const corsOptions ={
    origin:[ process.env.URL_REACT ], 
    credentials:true,     
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 



// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Running with port:", port)
})

