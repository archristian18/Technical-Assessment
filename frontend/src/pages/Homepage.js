import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';

import Banner from './Banner';
import Footer from './Footer';


function Homepage() {

    const history = useHistory();
    const [posts, setPost] = useState([]);
    const author_id =  localStorage.getItem('id');
    
    //Style selection
      const select = {
        border: '0px'  
      }

    // Getting the value database backend
    useEffect(() => {

        axios.post(`api/author/posts${author_id}`).then(res=>{
            if(res.status === 200)
            {
                setPost(res.data.posts);
            
            }
            else if(res.status === 401){
                history.push('/author/login');
            }
        });
    
    }, []);

    const handleChange = (e,id) => {
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
              // history.push('/mypost');
          }
          else{
            swal("Fail!",res.data.message,"Fail");
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
                      <div className="col-lg-6"   key={key}>
                        {/* Start post list item */}
                        <article className="d-flex flex-column blog-details" >

                            <div className="post-img"   style={{ width: '100%', height: '500px', paddingTop: '30px',  paddingLeft: '40px', alignItem: 'center'  }}>
                             
                             
                            <img src={item.image} alt="" className="img-fluid" style={{ width: '100%', height: '100%'}} /> 
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
                                  <li> &nbsp;<i className="bi bi-person" />{item.name}</li>
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