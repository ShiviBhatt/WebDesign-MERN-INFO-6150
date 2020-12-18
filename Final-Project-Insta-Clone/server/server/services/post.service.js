/* importing post js from model */
import Post from '../models/post';
import { request } from 'express';

/**
 * all post service
 */
const allpost = () => {
    const promise = Post.find()
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name")
        .sort('-createdAt').exec()
    return promise;
}

/**
 * fetching subscribed posts service
 * @param {*} user 
 */
const getsubpost = (user) => {
    const promise = Post.find({ postedBy: { $in: user.following } })
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name")
        .sort('-createdAt').exec();
    return promise;
}

/**
 * create post service
 * @param {*} reqPost 
 */
const createpost = (reqPost) => {
    const post = new Post({
        title: reqPost.title,
        body: reqPost.body,
        photo: reqPost.pic,
        postedBy: reqPost.user
    })
    const promise = post.save().then(result => {
        return result;
    })
    return promise;
}

/**
 * fetching logged in user's post service
 * @param {*} user 
 */
const mypost = (user) => {
    const promise = Post.find({ postedBy: user._id })
        .populate("PostedBy", "_id name").exec();
    return promise;
}

/**
 * liking the post service
 * @param {*} reqPost 
 */
const like = (reqPost) => {
    const promise = Post.findByIdAndUpdate(reqPost.postId, {
        $push: { likes: reqPost.user._id }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name pic").exec()
    return promise;
}

/**
 * unliking the post service
 * @param {*} reqPost 
 */
const unlike = (reqPost) => {
    const promise = Post.findByIdAndUpdate(reqPost.postId, {
        $pull: { likes: reqPost.user._id }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name pic").
    exec();
    return promise;
}

/**
 * commenting on a post service
 * @param {*} reqPost 
 */
const comment = (reqPost) => {
    const comment = {
        text: reqPost.text,
        postedBy: reqPost.user._id
    }
    const promise = Post.findByIdAndUpdate(reqPost.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name pic")
        .exec()
    
    return promise;
}

/**
 * deleting a post service
 * @param {*} reqPost 
 */
const deletepost = (reqPost) => {
    const promise = Post.findOne({_id:reqPost.id})
    .populate("postedBy","_id")
    .then((post) => {
        if(post.postedBy._id.toString() === reqPost.user._id.toString()){
                    return post.remove().then((result) =>{
                        return result;
                    })
                }
    })
    return promise;

}

/* exporting default functions */
export default {
    allpost: allpost,
    getsubpost: getsubpost,
    createpost: createpost,
    mypost: mypost,
    like: like,
    unlike: unlike,
    comment: comment,
    deletepost: deletepost
}