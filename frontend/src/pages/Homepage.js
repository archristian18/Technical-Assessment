import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

import Banner from './Banner';
import Footer from './Footer';
import ReactPost from './ReactPost';




function Homepage() {

    const history = useHistory();
    const [posts, setPost] = useState([]);
    


    // Getting the value database backend
    useEffect(() => {
    
        axios.get(`api/author/posts`).then(res=>{
            if(res.status === 200)
            {
                setPost(res.data.posts);
            
            }
            else if(res.status === 401){
                history.push('/author/login');
            }
        });


    
    }, []);

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
                      <div className="col-lg-6"   key={key}>
                        {/* Start post list item */}
                        <article className="d-flex flex-column blog-details" >

                            <div className="post-img"   style={{ width: '100%', height: '500px', paddingTop: '30px',  paddingLeft: '40px', alignItem: 'center'  }}>
                             
                             
                            <img src={item.image} alt="" className="img-fluid" style={{ width: '100%', height: '100%'}} /> 
                            </div>
                            <h2 className="title">
                            <a href="blog-details.html">{item.text}</a>
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
                                  <ReactPost props={item.id}/>
                                  <li> &nbsp;<i className="bi bi-person" /> <a href="blog-details.html">{item.name}</a></li>
                                  <li>
                                  <i className="bi bi-chat-dots"/>
                                  
                                  <Link className="nav-link" to={`/post/${item.id}`}>
                                  Comments</Link>
                                  </li>
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

  export default Homepage;