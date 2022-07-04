import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Header() {

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

      return (

          <header id="header" className="header d-flex align-items-center fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="/home" className="logo d-flex align-items-center">
              {/* Uncomment the line below if you also wish to use an image logo */}
              {/* <img src="assets/img/logo.png" alt=""> */}
              <h1 className="d-flex align-items-center">{username}</h1>
            </a>
            <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
            <nav id="navbar" className="navbar">
              <ul>

                <li><Link to="/home">Home</Link></li>
                <li> <Link to="/mypost">My Post</Link></li>
                <li><Link to="/author/add">Add Post</Link></li>
                <li onClick={logoutSubmit}><Link to="">Logout</Link></li>

              </ul>
            </nav>{/* .navbar */}
          </div>
          {/* End Header */}
          </header>



               
        );
      
    }
  
    export default Header;