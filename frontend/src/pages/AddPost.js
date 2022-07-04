import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import '../assets/img/favicon.png';
import '../assets/img/apple-touch-icon.png';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/aos/aos.css';
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/css/main.css';

function AddPost() {



     // Getting the value in input type Post
    const history = useHistory();
    const [postInput, setPost] = useState({
        text: '',
        image: '',
        error_list: [],
    });

    const [imagedata, setImagedata] = useState('');
    const id =  localStorage.getItem('id');
    
    const handleChange = file => {
      setImagedata(file[0]);
    }


    //getting value input type event
    const handleInput = (e) => {
        e.persist();
        setPost({...postInput, [e.target.name]: e.target.value })
     
    }

  // Create const to get the event form data and link to backend
    const savePost = (e) => {
        e.preventDefault();
        
        const fData = new FormData();
        fData.append('image', imagedata);
        fData.append('text', postInput.text);
        fData.append('id', id);


        axios.post(`/api/post/store`, fData).then(res => {
            
        // if else, Is for the Validation of form inputed
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setPost({
                    text: '',
                    image: '',
                    error_list: [],
                });
                history.push('/mypost');
            }
            else if(res.data.status === 422)
            {
                setPost({...postInput, error_list: res.data.validate_err });
            } 
        });
    }

    return (
 
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Post
        
                                </h4>
                            </div>
                            <div className="card-body">

                                <form onSubmit={savePost} >
                                    <div className="form-group mb-3">
                                        <label>Upload Image</label>
                         
                                        <input name="image" id="image" type="file" onChange={e => handleChange(e.target.files)} className="form-control" />
                                        <span className="text-danger">{postInput.error_list.image}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Content</label>
           
                                        <input type="text" name="text" onChange={handleInput} value={postInput.text}  className="form-control" />
                                        <span className="text-danger">{postInput.error_list.text}</span>
                                    </div>
                                    

                                 
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Submit Post</button>
                                    </div>
                           


                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    );

}

export default AddPost;
