/* importing mongoose */
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

/**
 * model for user posts
 */
const postSchema = new mongoose.Schema({
    /* post title */
    title:{
        type:String,
        required:true
    },
    /* post body */
    body:{
        type:String,
        required:true
    },
    /* post picture */
    photo:{
        type:String,
        required:true
    },
    /* likes on the post */
    likes:[{type:ObjectId,ref:"User"}],
    /* comments on the post */
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    /* user posted the comment */
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

/* defining post model variable */
const postModel = mongoose.model("Post",postSchema)

/* exporting default model */
export default postModel;