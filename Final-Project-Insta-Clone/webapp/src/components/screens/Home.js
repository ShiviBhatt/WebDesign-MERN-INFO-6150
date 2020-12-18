/* importing react, useStaate, useEffect, useContext */
import React,{useState,useEffect,useContext} from 'react'
/* importing UserContext from App */
import {UserContext} from '../../App'
/* importing Link from react router */
import {Link} from 'react-router-dom'

/**
 * home function 
 */
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        /* calling allpost API endpoint */
        fetch('/posts',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result)
           
       })
    },[])

    /**
     * like post function
     * @param {*} id 
     */
    const likePost = (id)=>{
        console.log("in here like")
            /* calling like API end point */
            fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    /**
     * unlike post function
     * @param {*} id 
     */
    const unlikePost = (id)=>{
        console.log("in here unlike")
            /* calling unlike API endpoint */
            fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    /**
     * make comment function
     * @param {*} text 
     * @param {*} postId 
     */
    const makeComment = (text,postId)=>{
            /* calling comment API endpoint */
            fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
            document.getElementById('commentinput').value = "";
          }).catch(err=>{
              console.log(err)
          })
    }

    /**
     * delete post function
     * @param {*} postid 
     */
    const deletePost = (postid)=>{
        /* calling deletepost API endpoint */
        fetch(`/posts/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    /* Home screen UI*/
    return (
       <div className="home">
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                           {/* name of the user posted the post */}
                            <h5 className="post-name">
                                <div className="userDetails">
                                <span><img src={item.postedBy.pic}></img></span>
                                <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> </div>
                                {item.postedBy._id == state._id 
                            && <i className="material-icons right" 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            {/* post image */}
                            <div className="card-image">
                                <img src={item.photo} className="postImage"/>
                            </div>
                            <div className="card-content">
                            <div className="postLike">
                            <span>❤️</span>
                            {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons effect"
                                    onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                            : 
                            <i className="material-icons effect"
                            onClick={()=>{likePost(item._id)}}>thumb_up</i>
                            }
                            </div>   
                            
                            
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span className="commentLabel">{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                     makeComment(e.target[0].value,item._id)
                                    console.log(e.target[0].value)
                                }}>
                                {/* add a comment button */}
                                <input type="text" placeholder="add a comment" id="commentinput"/>  
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
          
       </div>
   )
}


export default Home