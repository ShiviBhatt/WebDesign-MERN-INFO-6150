/* importing authService js file from services */
import authService from '../services/auth.service';

/**
 * controller method to handle sign in requests
 * @param {*} request 
 * @param {*} response 
 */
const signin = (request, response) => {
    authService.signin(request, response)
        .then((user) => {
            response.status(200);
            response.json(user);
            console.log(user);
        })
        .catch(handleError(response));
};

/**
 * controller method to handle signup requests
 * @param {*} request 
 * @param {*} response 
 */
const signup = (request, response) => {
    authService.signup(request, response)
        .then((user) => {
            response.status(200);
            response.json(user);
            console.log(user);
        })
        .catch(handleError(response));
};

/**
 * controller method to handle rest password requests
 * @param {*} request 
 * @param {*} response 
 */
const resetPassword = (request, response) => {
    authService.resetPassword(request, response)
        .then((res) => {
            response.status(200);
            response.json(res);
            console.log(res);
        })
        .catch(handleError(response));
};

/**
 * controller method to handle new password creation requests
 * @param {*} request 
 * @param {*} response 
 */
const newPassword = (request, response) => {
    authService.newPassword(request, response)
        .then((res) => {
            response.status(200);
            response.json(res);
            console.log(res);
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
    signin: signin,
    signup: signup,
    resetPassword: resetPassword,
    newPassword: newPassword
}