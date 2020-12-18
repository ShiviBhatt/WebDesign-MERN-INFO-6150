/* import react, useContext,useRef,useEffect,useState */
import React, {useContext,useRef,useEffect,useState} from 'react';
import {Link ,useHistory} from 'react-router-dom';
/* importing UserContext from App */
import {UserContext} from '../App';
/* import materialize */
import M from 'materialize-css';
import ReactTooltip from 'react-tooltip';

/**
 * NabBar function 
 */
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    useEffect(()=>{
      M.Modal.init(searchModal.current)
  },[])
    const renderList = ()=>{
       if(state){
           return [
             /* search users icon */
            <li key="1">
              <i  data-target="modal1" className="modal-trigger">
                <span data-tip data-for='search' className="material-icons" title="Search Users">search</span>
              </i>
              
            </li>,
            /* profile icon */
            <li key="2">
              <Link to="/profile">
                <span data-tip data-for='Profile' className="material-icons" title="Profile">account_box</span>
              </Link>
            </li>,
            /* post add icon */
            <li key="3">
              <Link to="/posts">
                <span className="material-icons" title="Post">post_add</span>
              </Link>
            </li>,
            /* my following post icon */
            <li key="4">
              <Link to="/myfollowingpost">
                <span className="material-icons" title="Explore">travel_explore</span>
              </Link>
            </li>,
            <li key="5">
              <i className="" onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
                }}>
                <span className="material-icons" title="Logout">outbound</span>
              </i>
            </li>       
           ]
       }else{
            return [
            /* sign in link */
            <li key="6"><Link to="/signin">Signin</Link></li>,
            /* sign up link */
            <li key="7"><Link to="/signup">Signup</Link></li>            
            ]
       }
     }

     const fetchUsers = (query)=>{
      setSearch(query)
      console.log(query);
      /* calling search-users api end point */
      fetch('/search-users',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      }).then(res=>res.json())
      .then(results=>{
        setUserDetails(results)
      })
   }
  
   /* Navbar screen UI */
    return(
        <nav>
        <div className="nav-wrapper">
          <Link to={state?"/":"/landing"} className=""><img className="instaLogo" src="../logo.png"></img></Link>
          <ul id="nav-mobile" className="nav-btn">
             {renderList()}
  
          </ul>
        </div>
        <div id="modal1" className="modal p-15" ref={searchModal}>
          <div className="modal-content">
            <input
              type="text"
              placeholder="search users"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {userDetails.map(item => {
                if(state !== null){
                return <Link to={item._id !== state._id ? "/profile/" + item._id : '/profile'} onClick={() => {
                  M.Modal.getInstance(searchModal.current).close()
                  setSearch('')
                }}><li className="collection-item">{item.email}</li></Link>
}})}

            </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close btn btn-color" onClick={() => setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    )
}


export default NavBar