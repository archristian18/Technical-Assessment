import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
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


function Login() {

    // Getting the value in input type author
    const history = useHistory();
    const [authorInput, setAuthor] = useState({
        name: '',
        password: '',
        error_list: [],
    });

    //getting value input type event
    const handleInput = (e) => {
        e.persist();        
        setAuthor({...authorInput, [e.target.name]: e.target.value })
    }

    // Create const to get the event form data and link to backend
    const saveLogin = (e) => {
        e.preventDefault();
        
        const data = {
            name:authorInput.name,
            password:authorInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login/auth`, data).then(res => {

                // if else, Is for the Validation of form inputed
                if(res.data.status === 200)
                {

                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('token', res.data.token)
                    swal("Success!",res.data.message,"success");
                    history.push('/home');
                } 
                else if(res.data.status === 422)
                {
                    setAuthor({...authorInput, error_list: res.data.validate_err });
                }
                else if(res.data.status === 205)
                {
                    swal("Not!",res.data.message,"error");
                    setAuthor({
                        name: '',
                        password: '',
                        error_list: [],
                    });
                }
                else{
                    swal("Not Found!",res.data.message,"error");
                }
            });
        });
    }
    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login
                                </h4>
                            </div>
                            <div className="card-body">
                                
                            <form onSubmit={saveLogin}>
                                    <div className="form-group mb-3">
                                        <label>Author's Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={authorInput.name} className="form-control" />
                                        <span className="text-danger">{authorInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={authorInput.password}  className="form-control" />
                                        <span className="text-danger">{authorInput.error_list.password}</span>
                                    </div>                                    
                                    <div className="form-group mb-3 ">
                                        <button type="submit" className="btn btn-primary ml">Login</button>
                                        &nbsp;&nbsp;
                                        <Link to={'/register'} className="btn btn-success"> Register</Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;
