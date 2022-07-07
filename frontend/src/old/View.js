import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ReactPost from './ReactPost';
import "emoji-regex";


function View() {

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
                     
                            <div className="well" key={index.toString()}>
                                    <div className="media">
                                        <div className="pull-left"  >
                                        {item.name}
                                        <img  className="media-object" src={item.image} width="30%" height="30%" alt="" />   
                                        <h4 className="media-heading">{item.text}</h4>
                                        <ReactPost props={item.id}/>
                                        

                                        <div>
                                   
                                    </div>
                                    <Link className="nav-link" to={`/comment/add/${item.id}`}>Comment</Link>
                                        </div>
                                            
                                    </div>         
                            </div>
                       
                      
            );
        });
    

    
  return (

<div>
<Navbar />

    <div className="container" >

        {posts_HTMLTABLE}  
        
    </div>
    
</div>
    );
}

export default View;



