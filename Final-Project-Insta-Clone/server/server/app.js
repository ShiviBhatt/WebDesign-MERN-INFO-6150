/* importing express */
import express from 'express';
/* importing path */
import path from 'path';
/* importing mongoose*/
import mongoose  from 'mongoose';
/* setting server port */
const PORT = process.env.PORT || 5000;
/* import mongo db URI */
import {MONGOURI} from './keys';

/* importing routes */
import routes from './routes';
/* connectig mongodb with the URI*/
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

/* checking mongo db connection */
mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
})

mongoose.connection.on('error',(err)=>{
    console.log("Error connectiong t MongoDB",err)
})

/* creating express app */
const app = express();
app.use(express.json())
/**
 * Returns middleware that only parses urlencoded bodies and only looks at 
 * requests where the Content-Type header matches the type option
 */
app.use(express.urlencoded({ extended: false }));
/**
 * serves static files and is based on serve-static 
 */
app.use(express.static(path.join(__dirname, 'public')));
routes(app);

/* listening app on the port */
app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})

export default app;