import express from 'express';
import bodyParser from 'body-parser';

import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

const app = express();
const corsOptions ={
    origin: 'http://localhost:3000', 
    credentials:true,     
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 



// config app
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Running with port:", port)
})

