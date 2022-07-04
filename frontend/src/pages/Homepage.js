import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';


import Footer from './Footer';
import Header from './Header';
import Banner from './Banner';




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
    
    var posts_HTMLTABLE = "";

    posts_HTMLTABLE = posts.map( (item, index) => {
        return (
                 
                        <div className="col-lg-6"  key={index.toString()}>
                        {/* Start post list item */}
                        <article className="d-flex flex-column">
                            <div className="post-img">
                            <img src={item.image} alt="" className="img-fluid" /> 
                            </div>
                            <h2 className="title">
                            <a href="blog-details.html">{item.text}</a>
                            </h2>
                            <div className="meta-top">
                            <ul>
                                <li ><i className="bi bi-person" /> <a href="blog-details.html">{item.name}</a></li>
                                <li ><i className="bi bi-chat-dots" /> <Link className="nav-link" to={`/post/${item.id}`}>Comments</Link></li>
                             
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

   
          <Header />

          
          <main id="main">

         <Banner />


            {/* ======= Blog Section ======= */}
            <section id="blog" className="blog">
              <div className="container" data-aos="fade-up">

                <div className="row g-5">
                  <div className="col-lg-12" data-aos="fade-up" data-aos-delay={200}>
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

  export default Homepage;