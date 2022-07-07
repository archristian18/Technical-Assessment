import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import Footer from './Footer';
import Banner from './Banner';
import Count from './Count';
import ReactCountPost from './ReactCountPost';
import ReactPost from './ReactPost';

function MyPost() {

  const history = useHistory();
  const id =  localStorage.getItem('id');

  const [posts, setPost] = useState([]); 

    // Getting the value database backend
    useEffect(() => {
    
        axios.post(`api/mypost${id}`).then(res=>{
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

    
    var posts_HTMLTABLE = "";

    posts_HTMLTABLE = posts.map( (item, index) => {
        return (
                 
                        <div className="col-lg-6"  key={index.toString()}>
                        {/* Start post list item */}
                        <article className="d-flex flex-column">
                            <div className="post-img">
                            <img src={item.image} alt="" className="img-fluid" 
                            style={{  backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/> 
                            </div>
                            <h2 className="title">
                            <a href="blog-details.html">{item.text}</a>
                            </h2>
                            <div className="meta-top">



                            <ul>
                          
                            <ReactCountPost props={item.id}/>
                            &nbsp;
                            <li>
                          
                            <Count props={item.id}/>
                            </li>  
                            </ul>


                              <ul>
                                <ReactPost props={item.id}/>
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
                   
                  
        );
    });



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

                     
                    {posts_HTMLTABLE}  



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