import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


import Footer from './Footer';
import Header from './Header';
import Banner from './Banner';


import '../assets/img/favicon.png';
import '../assets/img/apple-touch-icon.png';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/aos/aos.css';
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/css/main.css';



function Post(props) {

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
                            // window.location.reload();     
                            history.push('/home');                  
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
     
            <article className="blog-details" key={index.toString()}>
            <div className="post-img" >
              <img  src={item.image} alt="" className="img-fluid " style={{ display: 'block',  marginLeft: 'auto',  marginRight: 'auto',  width: '50%' }} />
            </div>
            <h2 className="title">{item.text}</h2>
            <div className="meta-top">
              <ul>
                <li className="d-flex align-items-center"><i className="bi bi-person" /> <a href="blog-details.html">{item.name}</a></li>
              </ul>
            </div>{/* End meta top */}
            <div className="content">

              {/* <p>
                Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda perferendis dolore.
              </p> */}

            </div>{/* End post content */}
            {/* End blog post */}
          </article>
                   
                  
        );
    });
    

    var commentView_HTMLTABLE = "";
    commentView_HTMLTABLE = comments.map( (item, index) => {
        return (
                            <div id="comment-1" className="comment" key={index}>
                            <div className="d-flex">
                        <p onClick={(e) => deletePost(e, item.id)} className="nav-link"  style={{  width: '2%', fontSize:'10px' }}>
                X 
                                </p>
                            <div>
                                <h5>{item.name}</h5>
                            
                                <p>
                                {item.text}
                                </p>
                            </div>
                            </div>
                            {/* End comment #1 */}
                        </div>
                    );
         });


    return (

        <div >

   
        <Header />

        
        <main id="main">

       <Banner />


      {/* ======= Blog Details Section ======= */}
      <section id="blog" className="blog comment-reply">
        <div className="container" data-aos="fade-up">
          <div className="row g-5">
            <div className="col-lg-10" data-aos="fade-up" data-aos-delay={200} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto'}}>
            {posts_HTMLTABLE}     
              <div className="comments">
                <h4 className="comments-count">Comments</h4>

                {commentView_HTMLTABLE} 
                                            
                
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