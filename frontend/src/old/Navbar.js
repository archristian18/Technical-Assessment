import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';




function Navbar ()
{
  const history = useHistory();


  const username =  localStorage.getItem('name');

  const logoutSubmit = (e) => {
   e.preventDefault();
  
    axios.post(`/api/logout`).then(res => {
        if(res.data.status === 200)
        {
          localStorage.removeItem('name', res.data.name)
          localStorage.removeItem('id', res.data.id)
          localStorage.removeItem('token', res.data.token)
          swal("Success!",res.data.message,"success");
          history.push('/author/login');
        }
    });
  }


  return(
    <div className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <h5 className="navbar-brand">{username}</h5>  
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <Link className="nav-link" to="/author/posts">Homepage</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/mypost">My Post</Link>
              </li>

              <li className="nav-item">
              <Link className="nav-link" to="/author/add">Add Post</Link>
              </li>
           
              <button type="button" className="nav-link btn btn-bg" onClick={logoutSubmit}>Logout</button>

          
            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;