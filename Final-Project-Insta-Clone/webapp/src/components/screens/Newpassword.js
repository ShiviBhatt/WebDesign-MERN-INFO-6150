/* importing react, useState, useContext */
import React,{useState,useContext,} from 'react'
/* importing Link, useHistory, useParams */
import {Link,useHistory,useParams} from 'react-router-dom'
/* import materialize */
import M from 'materialize-css'

/**
 * SignIn function
 */
const SignIn  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        /* calling new-password API endpoint */
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{

               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    /* Setting New Password screen UI */
   return (
    <div className="landing">
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
        
            <input
            type="password"
            placeholder="enter a new password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button className="btn btn-color"
            onClick={()=>PostData()}
            >
               Update password
            </button>
    
        </div>
      </div>
      </div>
   )
}


export default SignIn