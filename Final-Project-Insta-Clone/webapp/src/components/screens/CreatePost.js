/* importing react, usestate and useeffect */
import React,{useState,useEffect}  from 'react'
/* importing materialize css */
import M from 'materialize-css'
/* importing react dom */
import {useHistory} from 'react-router-dom'

/**
 * create post method
 */
const CreatePost = ()=>{
    const history = useHistory()
    /* title and setTitle from use state */
    const [title,setTitle] = useState("")
    /* body and setBody from use state */
    const [body,setBody] = useState("")
    /* image and setImage from use state */
    const [image,setImage] = useState("")
    /* url and setUrl from use state */
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        /* calling createpost API */
        fetch("/posts",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Posted Successfully! That's an awesome picture! 😍",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])

    /**
     * post details function
     */
    const postDetails = ()=>{
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

   /* Create Post screen UI */
    return(
        <div className="home">
            <div className="card input-filed post-card">
                {/* title of the post */}
                <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                {/* bosy of the post */}
                <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
                {/* upload image */}
                <div className="file-field input-field">
                    <div className="btn btn-color">
                        <span>Browse Image To Upload</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                {/* share post button */}
                <button className="btn btn-color" onClick={()=>postDetails()}> Share Post </button>
            </div>
        </div>
    )

}
export default CreatePost