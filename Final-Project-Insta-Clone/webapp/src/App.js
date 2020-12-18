/* importing react,userEffect,createContext,useReducer, useEffect,useContext */
import React,{userEffect,createContext,useReducer, useEffect,useContext} from 'react';
/* importing css */
import './dist/main.css';
/* importing NavBar */
import NavBar from './components/Navbar'
/* importing BrowserRouter,Route,Switch,useHistory */
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
/* importing Signup */
import Signup from './components/screens/Signup'
/* importing SubscribedUserPosts */
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
/* importing Home */
import Home from './components/screens/Home';
/* importing Signin */
import Signin from './components/screens/Signin'
/* importing Landing */
import Landing from './components/Landing'
/* importing reducer,initialState */
import {reducer,initialState} from './store/reducers/userReducer'
import Profile from './components/screens/Profile'
/* importing CreatePost */
import CreatePost from './components/screens/CreatePost'
/* importing UserProfile */
import UserProfile from './components/screens/UserProfile'
/* importing Reset */
import Reset from './components/screens/Reset'
/* importing NewPassword */
import NewPassword from './components/screens/Newpassword'

/* creating usercontext */
export const UserContext = createContext()

/* routing logic */
const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
 const user = JSON.parse(localStorage.getItem("user"))
 if(user){
   dispatch({type:"USER",payload:user})
 }else{
  if(!history.location.pathname.startsWith('/reset'))
    history.push('/landing')
 }
  },[])

  /* defining routes */
  return(
    <Switch>
      <Route exact path="/">
    <Home/>
    </Route>
    <Route path="/landing">
    <Landing />
  </Route>
    <Route path="/signup">
    <Signup />
  </Route>
  <Route path="/signin">
    <Signin />
  </Route>
  <Route exact path="/profile">
    <Profile/>
  </Route>
  <Route path="/posts">
    <CreatePost/>
  </Route>
  <Route path="/profile/:userid">
    <UserProfile />
  </Route>
  <Route path="/myfollowingpost">
    <SubscribedUserPosts />
  </Route>
  <Route exact path="/reset">
    <Reset/>
  </Route>
  <Route path="/reset/:token">
    <NewPassword/>
  </Route>
  </Switch>
  )
}

/* redux reducer state and dispatch */
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
   <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
        <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
