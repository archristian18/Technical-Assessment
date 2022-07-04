import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Register() {

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
    const saveStudent = (e) => {
        e.preventDefault();
        
        const data = {
            name:authorInput.name,
            password:authorInput.password,

        }
        
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/author/store`, data).then(res => {
        // if else, Is for the Validation of form inputed
                if(res.data.status === 200)
                {
                    swal("Success!",res.data.message,"success");
                    setAuthor({
                        name: '',
                        password: '',
                        error_list: [],
                    });
                    history.push('/author/login');
                }
                else if(res.data.status === 422)
                {
              
                    setAuthor({...authorInput, error_list: res.data.validate_err });
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
                                <h4>Register 
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveStudent} >
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
                                        <button type="submit" className="btn btn-primary ml">Register</button>
                                       
                                        <Link to={'/author/login'} className="btn btn-danger "> Cancel</Link>
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

export default Register;
