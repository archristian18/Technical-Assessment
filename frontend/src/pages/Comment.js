import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactComment from './ReactComment';

function Comment (props)
{
    //Show button when input text have value
    const [show, setShow] = useState(true);
    
    //Directory
    const history = useHistory();
    // Comment Comment Display
    const [comments, setCommentPost] = useState([]);

    // Comment Post Display
    const [posts, setPost] = useState([]);

    //Value Id for post
    const post_id = props.match.params.id;
    const [commentInput, setComment] = useState({
        comment: '',
        error_list: [],
    });

    
    //getting value input type event
    const handleInput = (e) => {
        e.persist();
      
        setComment({...commentInput, [e.target.name]: e.target.value })
        
        if(e.target.value === ""){
            setShow(true);
        }else{
            setShow(false);
        }
       
    }

    
    
    const author_id =  localStorage.getItem('id');

    // Add Comment Post
    const saveComment = (e) => {
        e.preventDefault();

            const data = {
                comment:commentInput.comment,
                id:post_id,
                author_id:author_id,
            }

            // Get Data Display
            axios.post(`/api/comment/add`, data).then(res => {
                // if else, Is for the Validation of form inputed
                        if(res.data.status === 200)
                        {
                            window.location.reload();                            
                        }

                        else if(res.data.status === 404)
                        {
                            swal("Fail!",res.data.message,"error");
                        }
                        else {
                            commentInput({...commentInput, error_list: res.data.validate_err });
                        }
                    });
    }

        // Getting posts data
        useEffect(() => {


            axios.post(`api/comment${post_id}`).then(res=>{
                if(res.status === 200)
                {
                    setCommentPost(res.data.comment);
                    history.push('/comment/add/:'.post_id);
                }
                else if(res.status === 401){
                    history.push('/author/login');
                }
            });


            axios.post(`api/comment/posts${post_id}`).then(res=>{
                if(res.status === 200)
                {
                    setPost(res.data.posts);
                }
                else if(res.status === 401){
                    history.push('/author/login');
                }
            });
    
        }, []);


  
     //const delete, Created to delete the specific id
     const deletePost = async (e, id) => {
        e.preventDefault();
        
        const data = {
            id:id,
            post_id:post_id,
            author_id:author_id,
        }

        const thisClicked = e.currentTarget;

        await axios.post(`/api/comment/delete`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("div").remove();
            
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
            }
            else if(res.data.status === 422){
                swal("Error",res.data.message,"error");
            }
        });
    }




    var posts_HTMLTABLE = "";

    posts_HTMLTABLE = posts.map( (item, index) => {
        return (
            
                        <div className="well" key={index.toString()}>
                                <div className="media">

                           
                                    <div className="pull-left"  >
                                    {item.name}
                                    <img  className="media-object"  src={item.image} width="10%" height="20%" alt="" />                                
                                
                                
                                        <div className="media-body">
                                            <h4 className="media-heading">{item.text}</h4>
                                        </div>


                                    </div>
                                </div>         
                        </div>
                   
                  
        );
    });



    var commentView_HTMLTABLE = "";
    commentView_HTMLTABLE = comments.map( (item, index) => {
        return (
                <div id="comment-1" className="comment" key={index}>
                  <div className="d-flex">

                    <div>
                    <span  onClick={(e) => deletePost(e, item.id)} className="nav-link">X</span>
                      <h5><a href>{item.name}</a></h5>
                      <time dateTime="2020-01-01">01 Jan,2022</time>
                      <p>
                      {item.text}
                      </p>
                      <hr></hr>
                    </div>
                  </div>
                  {/* End comment #1 */}
                </div>
                    );
         });

    return(
        <div>
                        <Navbar />
                        
                        <div className="container" >
                            <div className="well" >
                                        
                                        
                                        <div className="media">
                                                <div className="pull-left" >

                                                </div>   
                                                {posts_HTMLTABLE}     
                                                {commentView_HTMLTABLE} 
                                                
                                                
                                        </div>

                                            <div className="media">
                                                <div className="pull-left"  >

                                                </div>   
                                                    <form onSubmit={saveComment}>
                                                            <div className="media-body">
                                                                <h4 className="media-heading">Comment</h4>
                                                                <textarea id="comment" name="comment" rows="4" cols="150" onChange={handleInput} value={commentInput.comment} ></textarea>
                                                                <span className="text-danger">{commentInput.error_list.comment}</span>
                                                            </div>
                                        {show ? 
                                            <></>  
                                                            :  <button type="submit" className="nav-link btn btn-bg btn-info">Submit</button>  
                                        }
                                                    </form>
                                                
                                                
                                            </div>
                                            
                            </div>     
                        </div>

        </div>


    );


}

export default Comment;