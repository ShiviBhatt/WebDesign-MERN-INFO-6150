/* importing user model */
import User from '../models/user';
/* importing post model */
import Post from '../models/post'
/* importing requireLogin from model */
import requireLogin  from '../middleware/requireLogin';

/**
 * searching users based on id
 * @param {*} id 
 */
const search = (id) => {
    const promise = User.findOne({_id:id})
    .select("-password")
    .then(user=>{
        return Post.find({postedBy:id})
         .populate("postedBy","_id name")
         .then((posts)=>{
            let result = {
                user: user,
                posts: posts
            };
            return result;
         })
    })
    return promise;
}

/**
 * following user service
 * @param {*} reqUser 
 */
const follow = (reqUser) =>{
    const promise = User.findByIdAndUpdate(reqUser.followId,{
        $push:{followers:reqUser.user._id}
    },{ new:true })
    .then( result =>{
      return User.findByIdAndUpdate(reqUser.user._id,{
          $push:{following:reqUser.followId}
      },{new:true}).select("-password").then((res)=>{
          return res;
      })
    })
    return promise;
}

/**
 * unfollow user service
 * @param {*} reqUser 
 */
const unfollow = (reqUser) =>{    
    const promise = User.findByIdAndUpdate(reqUser.unfollowId,{
        $pull:{followers:reqUser.user._id}
    },{
        new:true
    }).then(result=>{
      return User.findByIdAndUpdate(reqUser.user._id,{
          $pull:{following:reqUser.unfollowId}
          
      },{new:true}).select("-password").then((res)=>{
        return res;
    })

    })
    return promise;
}

/**
 * update pic user service
 * @param {*} reqBody 
 */
const updatepic = (reqBody) =>{    
    const promise = User.findByIdAndUpdate(reqBody.user._id,{$set:{pic:reqBody.pic}},{new:true}).exec()
    return promise;
}

/**
 * search users services
 * @param {*} query 
 */
const search_users = (query) =>{      
    let userPattern = new RegExp("^"+query)
    const promise = User.find({email:{$regex:userPattern}})
    .select("_id email").exec()
    return promise;
}

/* exporting default functions  */
export default {
    search: search,
    follow: follow,
    unfollow: unfollow,
    updatepic: updatepic,
    search_users: search_users
}