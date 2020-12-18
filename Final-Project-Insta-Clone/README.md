<h1 align="center">
       <img src="https://user-images.githubusercontent.com/71218150/102064201-dfe59880-3dab-11eb-85bc-2c14c746876e.png" alt="Girl in a jacket"><br>
       INSTAGRAM CLONE
</h1>
<p align="center">
🌐 MERN Stack (MongoDB, Expressjs, React/Redux, Nodejs)<br>
      <h1 align="center">Final Project </h1>
</p><br>

### Guidelines: <hr>

1. The project should have some form of create, read, update and delete (CRUD) operations.
2. The backend can be implemented using Nodejs/mongo or just use any open APIs.
3. Project git repo should have two directories: one for UI (named webapp) and the other for backend (named server).
4. The code should be merged on the master branch before the deadline. If the code is not in master then it won't be graded.
5. You should follow all the guidelines listed on assignments like code documentation, README.md file, .gitignore file etc.
6. No shopping site.
### Project Features
1. User can signup
2. User can signin
3. User can Create a photo post
4. User can visit his own profile and Update profile picture and see his followers
5. User can see the photo feed
6. User can see post of other user which he is following
7. User can follow and unfollow other users profile
8. User can like and dislike other user photo post
9. User can comment on other user photo post
10. User can Delete his photo post
11. User can search other users
12. User can reset his password using forgot password<br>
### Project Structure <hr>
```bash
├── Final-Project-Dev-Huskies
├── images
│    └── instagram.png
├── node_modules
├── server
│   ├── dist(build)
│   ├── node_modules
│   ├── public
│   │     ├── stylesheets
│   │     │     └──style.css
│   │     └──index.html
│   ├── server
│   │     ├── bin
│   │     │    └──www.js
│   │     │── controllers
│   │     │     │──auth.controller.js 
│   │     │     │──post.controller.js 
│   │     │     └──user.controller.js
│   │     │── middleware
│   │     │     └──requireLogin.js
│   │     │── models
│   │     │    │──post.js 
│   │     │    └──user.js
│   │     │── routes
│   │     │    │──auth.js 
│   │     │    │──index.js 
│   │     │    │──post.js 
│   │     │    └──user.js
│   │     │── services
│   │     │    │──auth.service.js 
│   │     │    │──post.service.js
│   │     │    └──user.service.js
│   │     │── app.js   
│   │     └── keys.js 
│   ├── package-lock.json
│   └── package.json
├── webapp
│   ├── build
│   ├── node_modules
│   ├── public 
│   ├── src
│   │     ├── components  
│   │     │     │──screens 
│   │     │     │    │──CreatePost.js 
│   │     │     │    │──Home.js 
│   │     │     │    │──NewPassword.js 
│   │     │     │    │──Profile.js 
│   │     │     │    │──Reset.js 
│   │     │     │    │──Signin.js 
│   │     │     │    │──Signup.js 
│   │     │     │    │──SubscribeUserPosts.js 
│   │     │     │    └──UserProfile.js 
│   │     │     │──landing.js 
│   │     │     └──navBar.js
│   │     │    
│   │     │── dist
│   │     │     └──main.css
│   │     │── scss
│   │     │    │──_mixins.scss
│   │     │    │──_spacing.scss
│   │     │    │──_variables.scss
│   │     │    │──layout.scss
│   │     │    │──main.scss
│   │     │    │──psuedo-class.scss
│   │     │    └──simple-selectors.scss
│   │     │── store
│   │     │    │──action 
│   │     │    └──reducers
│   │     │     │    └──userReducer.js
│   │     │── App.js
│   │     └── index.js
│   ├── .eslintcache
│   ├── .gitignore 
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── README.md
└── .gitignore
```



### Instructions to Setup this Project <hr>

#### clone or download
```terminal
$ git clone https://github.com/neu-mis-info6150-fall-2020/final-project-dev-huskies.git
$ npm i
```
#### Usage (run fullstack app on your machine)

#### Client-side usage(PORT: 3001)
```terminal
$ cd webapp   // go to client folder
$ npm i       // npm install pacakges
$ npm run build-sass // to generate the fresh build for UI changes
$ npm start // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```
#### Server-side usage(PORT: 5000)
```terminal
$ cd server   // go to client folder
$ npm i       // npm install pacakges
$ npm run build // to generate the fresh build
$ npm run serve // run it locally

// deployment for webapp app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```
#### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install pacakges
$ npm run serve // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```

# Screenshots of this project

User visit public and Home page
<img width="1090" alt="Screen Shot 2020-12-14 at 11 15 38 AM" src="https://user-images.githubusercontent.com/71218150/102125334-61661680-3dfe-11eb-8ae0-af4d4773bd7c.png">

User can Signup
<img width="1087" alt="Screen Shot 2020-12-14 at 11 15 57 AM" src="https://user-images.githubusercontent.com/71218150/102125470-9b371d00-3dfe-11eb-84e7-645338cdeb6d.png">

After Signup user can signin
<img width="1089" alt="Screen Shot 2020-12-14 at 11 16 08 AM" src="https://user-images.githubusercontent.com/71218150/102125590-c4f04400-3dfe-11eb-8c58-ad7cdabbb0ac.png">

After Sign in user can see the feed page
<img width="1319" alt="Screen Shot 2020-12-14 at 11 17 05 AM" src="https://user-images.githubusercontent.com/71218150/102125638-d9344100-3dfe-11eb-8567-ffb1f159de0c.png">

User can visit other profile 
<img width="1312" alt="Screen Shot 2020-12-14 at 11 17 36 AM" src="https://user-images.githubusercontent.com/71218150/102125769-008b0e00-3dff-11eb-8cbf-70df460d3885.png">
User can Create a post
<img width="1310" alt="Screen Shot 2020-12-14 at 11 17 53 AM" src="https://user-images.githubusercontent.com/71218150/102125833-1b5d8280-3dff-11eb-9c7a-09c829a071f4.png">

User can see his following post
<img width="1318" alt="Screen Shot 2020-12-14 at 11 27 28 AM" src="https://user-images.githubusercontent.com/71218150/102126018-5e1f5a80-3dff-11eb-852f-edf39678a22c.png">





### Developed by <hr>
🌱 Team Name : Dev Huskies<br>
🎓 Members: Shivi Bhatt | Mayank Deshpande | Dhankuwar Sisodiya | Yashwant Kotipalli <br>
✉️ Email: bhatt.s@northeastern.edu | deshpande.m@northeastern.edu | sisodiya.d@northeastern.edu | kotipalli.ve@northeastern.edu <br>

