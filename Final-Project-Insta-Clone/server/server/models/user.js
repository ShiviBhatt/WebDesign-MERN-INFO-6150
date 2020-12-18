/* importing mongoose */
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types

/**
 * model for user
 */
const userSchema = new mongoose.Schema({
    /* name of the user*/
    name: {
        type:String,
        required:true
    },
    /* email of the user */
    email: {
        type:String,
        required:true
    },
    /* password of the user */
    password: {
        type:String,
        required:true
    },
    /* reset token of the user for reset passwod functionality */
    resetToken: String,
    /* time when token expires for the reset password functionality */
    expireToken: Date,
    /* user profile picture */
    pic:{
        type:String,
        default:"https://res.cloudinary.com/devhuskiesinstaclone/image/upload/v1607647179/defaultpic_s1dviw.png"
    },
    /* followers of the user */
    followers:[{type:ObjectId,ref:"User"}],
    /* people followig the user */
    following:[{type:ObjectId,ref:"User"}]
})

/* defining user model variable */
const userModel = mongoose.model("User",userSchema);

/* exporting default model */
export default userModel;