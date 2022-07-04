import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from './Navbar';

function MyPost() {

    
    const history = useHistory();
    const id =  localStorage.getItem('id');

    const [posts, setPost] = useState([]); 

    // Getting the value database backend Post
    useEffect(() => {

        axios.post(`api/mypost${id}`).then(res=>{
            if(res.status === 200)
            {
                setPost(res.data.posts);
            }
            else if(res.status === 401){
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
                thisClicked.closest("div").remove();
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
                     
                            <div className="well" name="post" key={index.toString()}>
                                    <div className="media">
                                        <div className="pull-left"  >
                                        {item.name}
                                        <img  className="media-object"  src={item.image} width="30%" height="30%" alt="" />                                
                                       
                                        <h4 className="media-heading">{item.text}</h4>
                                        </div>
                                                                             
                                    </div>
                                    <div className="media">
                                    <div className="pull-left"  >
                                    
                                    <Link className="nav-link" to={`/post/edit/${item.id}`}>Edit</Link> 
                                    <Link className="nav-link" to={`/comment/add/${item.id}`}>Comment</Link>
                                    </div>
                                  
                                    </div> 
                                    <span className="nav-link" onClick={(e) => deletePost(e, item.id)} >Delete</span>
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

export default MyPost;



