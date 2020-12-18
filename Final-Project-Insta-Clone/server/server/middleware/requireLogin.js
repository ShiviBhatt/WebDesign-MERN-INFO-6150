/* importing jwt from jsonwebtoken */
import jwt from 'jsonwebtoken';
/* importing JWT secret key from keys */
import {JWT_SECRET} from '../keys';
/* importing mongoose */
import mongoose from 'mongoose';
/* importing user model */
const User = mongoose.model("User");

/**
 * require authentication method to handle authetication before going to restricted URL's
 * @param {*} req 
 * @param {*} res 
 */
const requireAuthentication = (req, res) =>{
const {authorization} = req.headers
// authorization === Bearer
if(!authorization){
    return res.status(401).json({error : "you must be logged in "});
}
const token = authorization.replace("Bearer ", "");
const promise = jwt.verify(token, JWT_SECRET,(err, payload) => {
    if(err){
        res.status(401).json({error: "you must be logged in"});
    }
    const {_id} = payload
    return User.findById(_id).then(userdata =>{
        return req.user = userdata
    });    
});
return promise;
}

export default requireAuthentication;