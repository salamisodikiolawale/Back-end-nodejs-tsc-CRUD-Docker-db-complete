import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as mongoose from "mongoose";
import apiRouter from "./router/apiRouter";


const app:express.Application = express();

// Configurations
app.use(cors());
dotenv.config( {path : './.env'}); // for env variable
app.use(express.json()); // json form data

let hostName:string|undefined = process.env.HOST_NAME;
let port:number|undefined = Number(process.env.PORT);
let mongoDBUrl:string|undefined = process.env.MONGODB_URL;

let auth_Source:string| undefined = process.env.AUTH_SOURCE;
let U:string|undefined = process.env.USER;
let password:string|undefined = process.env.PASSWORD;

// MongoDB connection
if(mongoDBUrl) {
    mongoose.connect(mongoDBUrl, {
        authSource: 'admin',
        user: 'admin',
        pass: 'root',
        }).then( () => {
        console.log('Connecting to mongoDB Successfully ...');
    }).catch( (error) => {
        console.log(error);
        process.exit(1); // Stop the node js process
    });
}

app.get('/', (request:express.Request, response:express.Response) => {
    response.status(200).json("Welcome express server of good app");
});

// Route Configuration
app.use('/api/v1/', apiRouter);

if(port !== undefined && hostName !== undefined){
    app.listen(port, hostName, () => {
        console.log(`Express Server is running at ${hostName}:${port}`);
    });
}



