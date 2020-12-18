/* import react,useEffect,useRef,useState,useContext */
import React,{useEffect,useRef,useState,useContext} from 'react'
/* import UserContext from App*/
import {UserContext} from '../../App'
import {useHistory} from 'react-router-dom';
/* import materialize css */
import M from 'materialize-css';

/**
 * Profile function
 */
const Profile  = ()=>{
    const  picShow = useRef(null)
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const history = useHistory()
    useEffect(()=>{
        /* calling mypost API endpoint */
        fetch('/myposts',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result)
       })
       M.Modal.init(picShow.current)
    },[])
    useEffect(()=>{
       if(image){
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
    
            /* calling updatepic API end point */
           fetch('/users',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               /* calling redux */
               dispatch({type:"UPDATEPIC",payload:result.pic})
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }

    /* Profile screen UI */
    return (
       <div className="home">
           <div className="profileContainer">
               <div className="profile">
                   <div className="profilePic">
                       <label htmlFor="file-input">
                           <img className="user-profile-pic"
                               src={state ? state.pic : "loading"} />
                       </label>
                       {/* update photo button */}
                       <input type="file" id="file-input" onChange={(e) => updatePhoto(e.target.files[0])} />
                   </div>
                   <div>
                       {/* loading UI */}
                       <h4>{state ? state.name : "loading"}</h4>
                       <h5>{state ? state.email : "loading"}</h5>
                       {/* no of posts, followers and following count */}
                       <div className="profileData">
                           <h6>{mypics.length} posts</h6>
                           <h6>{state ? state.followers.length : "0"} followers</h6>
                           <h6>{state ? state.following.length : "0"} following</h6>
                       </div>
                   </div>
               </div>
           </div>      
           {/* list of photos posted by user */}
           <div className="gallery profileContainer">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} data-target="picMaximizeModel" className="modal-trigger item" 
                        src={item.photo} alt={item.title}/>  
                       )
                   })
                }           
           </div>
       </div>
   )
}


export default Profile


