import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


import Footer from './Footer';
import Banner from './Banner';


function Post(props) {

      //style selection
      const select = {
        border: '0px'  
      }

     //Show button when input text have value
     const [show, setShow] = useState(true);
             


    //Value Id for post
    const post_id = props.match.params.id;
    //Directory
    const history = useHistory();

    // Comment Post Display
    const [posts, setPost] = useState([]);
    
    // Comment Comment Display
    const [comments, setCommentPost] = useState([]);

    const author_id =  localStorage.getItem('id');

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

 // Getting posts data
 useEffect(() => {


  const data = {
    post_id:post_id,
    author_id:author_id,
}



        axios.post(`api/comment`, data).then(res=>{
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
                            // history.push('/home');                  
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
                thisClicked.closest("article").remove();
             
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

         // const delete, Created to delete the specific id
         const handleChange = (e, id) => {
          e.preventDefault();


          const data = {
              name:e.target.value,
              comment_id:id,
              author_id:author_id,
          }
  
          axios.post(`/api/react/comment`,  data).then(res=>{
              if(res.data.status === 200)
              {
                  swal("Success!",res.data.message,"success");
                
              }
              else if(res.data.status === 404)
              {
                  swal("Error",res.data.message,"error");
                
              }
          });
      }    


    


    return (

        <div >

   
     
<Banner />
        
      <main id="main">

      {/* ======= Blog Details Section ======= */}
      <section id="blog" className="blog comment-reply">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-10" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto'}}>

            {/* POST IMAGE AND TEXT */}
            {Object.entries(posts).map(([key, item]) => (
              <article className="blog-details" key={key}>
            <div className="post-img" 
            style={{

              height: '500px',

            }}>      

              <img  src={item.image} alt="" className="img-fluid " style={{ display: 'block',  marginRight: 'auto',  width: '100%', height: '500px' }} />
            </div>
            <h2 className="title">{item.text}</h2>
            <div className="meta-top">
              <ul>
                <li className="d-flex align-items-center"><i className="bi bi-person" />{item.name}</li>
              </ul>
            </div>{/* End meta top */}
            <div className="content">


            </div>{/* End post content */}
            {/* End blog post */}
          </article>
              ))}


              <div className="comments">
                <h4 className="comments-count">Comments</h4>

                {Object.entries(comments).map(([key, item]) => 
           
        
                (
                  <article id="comment-1" className="comment"  key={key}>
                            <div className="d-flex blog-details" style={{padding:'15px'}}>

                    
                            <p onClick={(e) => deletePost(e, item.id)} className="nav-link"  
                            style={{  width: '2%', fontSize:'10px', display:(author_id === item.author_id)? 'block' : 'none' }} >
                           X
                            </p>

                            <div>
                                <h5>{item.name}</h5>
                                {item.text}
                            </div>
                       
                            </div><div style={{padding:'7px'}}>
                            Like 
                            &nbsp;
                                
                                <select name="react"  defaultValue={'DEFAULT'}  onChange={e => handleChange(e, item.id)} style={select}> 
                                <option value="DEFAULT" disabled hidden> {item.reactName} </option>
                                <option value="👍" id="2" >
                                <span role="img" aria-label="like">👍</span> 
                                </option>
                                <option value="❤️" id="3">
                                <span role="img" aria-label="heart">❤️</span> 
                                </option>
                                <option value="🙂">
                                    <span role="img" aria-label="smile">🙂</span> 
                                </option>
                                </select>

                            </div>
                            {/* End comment #1 */}
                  </article>
              ))}

                                            
                
                <div className="reply-form">
                  <h4>Comment</h4>
                  <form onSubmit={saveComment}>
                    <div className="row">
                      <div className="col form-group">

                        <textarea name="comment" rows="4" cols="150" className="form-control" 
                        placeholder="Your Comment*" 
                        onChange={handleInput}
                        value={commentInput.comment} />
                      </div>
                    </div>
                    {show ? 
                           <></>  
                           :
                        <button type="submit" className="btn btn-primary">
                        Post Comment</button>  
                    }
                   
                  </form>
                </div>
              </div>{/* End blog comments */}
            </div>
          </div>
        </div>
      </section>{/* End Blog Details Section */}

          
        </main>{/* End #main */}

      
          <Footer />
          


      </div>

    );
    
}

export default Post;