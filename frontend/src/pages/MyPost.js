import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import Footer from './Footer';
import Banner from './Banner';


function MyPost() {

  const history = useHistory();
  const author_id =  localStorage.getItem('id');

      
  const select = {
    border: '0px'  
  }


  const [posts, setPost] = useState([]); 

    // Getting the value database backend
    useEffect(() => {
    
        axios.post(`api/mypost${author_id}`).then(res=>{
            if(res.status === 200)
            {
                setPost(res.data.posts);
            }
            else if(res.status === 401){
              setPost(res.data.posts);
                history.push('/author/login');
            }
        });
    
    }, []);

 // const delete, Created to delete the specific post
 const deletePost = async (e, id) => {
  e.preventDefault();
  
  const thisClicked = e.currentTarget;

  await axios.delete(`/api/post/delete${id}`).then(res=>{
      if(res.data.status === 200)
      {
          swal("Deleted!",res.data.message,"success");
          thisClicked.closest("article").remove();
          // history.push('/author/posts');
      }
      else if(res.data.status === 404)
      {
          swal("Error",res.data.message,"error");
          // thisClicked.innerText = "Delete";
          history.push('/mypost');
      }
  });
}

const handleChange = (e, id) => {
  e.preventDefault();


  const data = {
      name:e.target.value,
      post_id:id,
      author_id:author_id,
  }

  axios.post(`/api/react/post`,  data).then(res=>{
      if(res.data.status === 200)
      {
          swal("Success!",res.data.message,"success");
          // window.location.reload();   
      }
      else if(res.data.status === 404)
      {
          swal("Error",res.data.message,"error");
          history.push('/mypost');
      }
  });

}
   
      return (
        <div >

        <Banner />
         
          <main id="main">

            {/* ======= Blog Section ======= */}
            <section id="blog" className="blog">
              <div className="container">

                <div className="row g-5">
                  <div className="col-lg-12" >
                    <div className="row gy-5 posts-list">

                    {Object.entries(posts).map(([key, item]) => (

                      <div className="col-lg-6"  key={key}>
                        {/* Start post list item */}
                        <article className="d-flex flex-column blog-details">
                            <div className="post-img">
                            <img src={item.image} alt="" className="img-fluid" 
                            style={{  backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/> 
                            </div>
                            <h2 className="title">
                            {item.text}
                            </h2>
                            <div className="meta-top">
                            <ul>
                            <li style={{ display:(item.react <= 0)? 'none' : 'block'}}>
                            <i className="bi bi-person" />
                            {item.react}
                            </li>
                            &nbsp;
                            <li style={{ display:(item.comment <= 0)? 'none' : 'block'}}>
                            <i className="bi bi-chat-dots" />
                            {item.comment}  
                            </li>  
                            </ul>

                                  <ul>
                                    {/* <ReactPost props={item.id}/> */}
                                    <select name="react"  defaultValue={'DEFAULT'}  onChange={e => handleChange(e, item.id)} style={select}> 
                                    <option value="DEFAULT"   disabled hidden> {item.reactName}  </option>
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
                                    <li>
                                    <i className="bi bi-chat-dots"/>
                                  
                                    <Link className="nav-link" to={`/post/${item.id}`}>
                                    Comments</Link>
                                    </li>
                                    <li ><i className="bi bi-book" /> 
                                    <Link className="nav-link" to={`/edit/${item.id}`}>Edit</Link></li>
                                

                                    <li ><i className="bi bi-trash" />
                                    <Link className="nav-link" to={`/post/${item.id}`} 
                                    onClick={(e) => deletePost(e, item.id)}>Delete</Link></li>
                                
                                  </ul>


                            </div>
                            <div className="content">

                            </div>

                        </article>
                        {/* End post list item */}
                        </div>
                      ))}
           
                    </div>{/* End blog posts list */}
                    
                  </div>
                </div>
              </div>
            </section>{/* End Blog Section */}
            
          </main>{/* End #main */}

            <Footer />

        </div>
        
      );
    
  }

  export default MyPost;