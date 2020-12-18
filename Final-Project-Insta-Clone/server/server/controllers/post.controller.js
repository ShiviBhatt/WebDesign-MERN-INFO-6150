/* importing postService js file from services */
import postService from '../services/post.service';
/* importing requireLogin js file from middleware */
import requireLogin  from '../middleware/requireLogin';

/**
 * controller method to handle all post requests
 * @param {*} request 
 * @param {*} response 
 */
const allpost = (request, response) => {
    postService.allpost()
        .then((post) => {
            response.status(200);
            response.json(post);
        })
        .catch(handleError(response));
};

/**
 * controller method to handle subscribed posts requests
 * @param {*} request 
 * @param {*} response 
 */
const getsubpost = (request, response) => {
     requireLogin(request, response).then( (user) =>{
        postService.getsubpost(user)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
        })
    })
    .catch(handleError(response));
};

/**
 * controller method to handle create post requests
 * @param {*} request 
 * @param {*} response 
 */
const createpost = (request, response) => {
    requireLogin(request, response).then( (user) =>{
        if (!request.body.title || !request.body.body || !request.body.pic) {
            return response.status(422).json({ error: "Please add all the fields" })
        }
        user.password = undefined
        const post = {
            user: user,
            title: request.body.title,
            body: request.body.body,
            pic: request.body.pic
        }
    postService.createpost(post)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to handle my posts requests
 * @param {*} request 
 * @param {*} response 
 */
const mypost = (request, response) => {
    requireLogin(request, response).then( (user) =>{
    postService.mypost(user)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to handle like requests on the posts
 * @param {*} request 
 * @param {*} response 
 */
const like = (request, response) => {
    requireLogin(request, response).then( (user) =>{
        const reqPost = {
            postId : request.body.postId,
            user: user
        }
    postService.like(reqPost)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to handle unlike requests on the posts
 * @param {*} request 
 * @param {*} response 
 */
const unlike = (request, response) => {
    requireLogin(request, response).then( (user) =>{
        const reqPost = {
            postId : request.body.postId,
            user: user
        }
    postService.unlike(reqPost)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
        })
    })
        .catch(handleError(response));
};

/**
 * controller method to post comments on the user posts
 * @param {*} request 
 * @param {*} response 
 */
const comment = (request, response) => {
    requireLogin(request, response).then( (user) =>{
        const reqPost = {
            postId : request.body.postId,
            text: request.body.text,
            user: user
        }
    postService.comment(reqPost)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
        })
    })
        .catch(handleError(response));
};

/**
 * controller methos to handle delete posts requests
 * @param {*} request 
 * @param {*} response 
 */
const deletepost = (request, response) => {
    requireLogin(request, response).then( (user) =>{
        const reqPost = {
            id: request.params.postId,
            user: user
        }
    postService.deletepost(reqPost)
        .then((post) => {
            response.status(200);
            response.json(post);
            console.log(post);
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
    allpost: allpost,
    getsubpost: getsubpost,
    createpost: createpost,
    mypost: mypost,
    like: like,
    unlike: unlike,
    comment: comment,
    deletepost: deletepost
}