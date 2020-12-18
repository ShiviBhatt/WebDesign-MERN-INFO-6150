/* importing react, useState,useContext */
import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
/* importing UserContext from App*/
import {UserContext} from '../../App'
/* importing materialize*/
import M from 'materialize-css'

/**
 * SignIn function
 */
const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        /* email validation regex */
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        /* calling signin API endpoint */
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error+" 🙁",classes:"errorClass"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"Signed In Into Awesomeness 🤍",classes:"successClass"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    /* SignIn screen UI */
    return (
       <div className="landing">
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            {/* email field */}
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            {/* password field */}
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            {/* Login button */}
            <button className="btn m-20 btn-color"
            onClick={()=>PostData()}
            >
                Login
            </button>
            {/* redirecting to signup page */}
            <h5 className="m-0 color-blue">
                <Link to="/signup">Dont have an account?</Link>
            </h5>
            {/* redirecting to rest password page */}
            <h6 className="color-blue">
                <Link to="/reset">Forgot password?</Link>
            </h6>
    
        </div>
      </div></div>
   )
}


export default SignIn