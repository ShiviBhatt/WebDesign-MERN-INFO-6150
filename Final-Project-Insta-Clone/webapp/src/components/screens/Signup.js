/* importing react, useState,useContext */
import React,{useState,useEffect} from 'react'
/* importing Link,useHistory from react router */
import {Link,useHistory} from 'react-router-dom'
/* importing materialize */
import M from 'materialize-css'

/**
 * SignUp function
 */
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    /**
     * upload pic function
     */
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","giw3e6oe")
        data.append("cloud_name","devhuskiesinstaclone")
        fetch("https://api.cloudinary.com/v1_1/devhuskiesinstaclone/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    /**
     * upload fields function
     */
    const uploadFields = ()=>{
        /* email regex check */
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        /* calling signup API endpoint */
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
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
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

    /* Signup screen UI */
    return (
    <div className="landing">
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            {/* name input field */}
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            {/* email input field */}
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            {/* password input field */}
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            {/* upload image field */}
            <div className="file-field input-field">
            <div className="btn btn-color">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            {/* sign up button */}
            <button className="btn waves-effect waves-light btn-color"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            {/* redirecting to signin link */}
            <h5 className="color-blue">
                <Link to="/signin">Already have an account?</Link>
            </h5>
             
               
         
            </div> 
    
        </div>
      </div>
   )
}


export default SignIn