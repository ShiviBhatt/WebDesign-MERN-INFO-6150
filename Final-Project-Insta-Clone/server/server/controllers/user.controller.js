/* importing userService js file from services */
import userService from '../services/user.service';
/* importing requireLogin js file from middleware */
import requireLogin  from '../middleware/requireLogin';

/**
 * Controller to get user by id
 * @param {*} request : api request
 * @param {*} response : api response
 */
const getUser = (request, response) => {
    const id = request.params.id;
    requireLogin(request, response).then( (user) =>{
    userService.search(id)
        .then((user) => {
            response.status(200);
            response.json(user);
            
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to search users based on the username
 * @param {*} request 
 * @param {*} response 
 */
const search_users = (request, response) => {
    userService.search_users(request.body.query)
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(handleError(response));
};

/**
 * controller method for handling update profile picture requests
 * @param {*} request 
 * @param {*} response 
 */
const updatepic = (request, response) => {
    requireLogin(request, response).then( (user) =>{
     const reqBody = {
         user: user,
         pic : request.body.pic
     }
    userService.updatepic(reqBody)
        .then((res) => {
            response.status(200);
            response.json(res);
            console.log(res);
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to handle follow requests
 * @param {*} request 
 * @param {*} response 
 */
const follow = (request, response) => {
    requireLogin(request, response).then( (user) =>{
    const reqUser = {
        followId: request.body.followId,
        user: user
    }   
    userService.follow(reqUser)
        .then((res) => {
            response.status(200);
            response.json(res);
            console.log(res);
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to handle unfollow requests
 * @param {*} request 
 * @param {*} response 
 */
const unfollow = (request, response) => {
    requireLogin(request, response).then( (user) =>{
        const reqUser = {
            unfollowId: request.body.unfollowId,
            user: user
        }   
    userService.unfollow(reqUser)
        .then((res) => {
            response.status(200);
            response.json(res);
            console.log(res);
        })
    })
        .catch(handleError(response));
};

/**
 * Controller function to handle error status and response
 * @param {*} response : api response
 */
const handleError = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

/**
 * exporting default functions
 */
export default {
    getUser: getUser,
    follow: follow,
    unfollow: unfollow,
    updatepic: updatepic,
    search_users: search_users
}