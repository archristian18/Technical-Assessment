import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';



function Banner() {

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
          

            <div className="breadcrumbs d-flex align-items-center"  
            style={{backgroundImage: 'url("../../assets/img/blog-header.jpg")',  
            position: 'relative'}} >
           
           <header id="header" className="header d-flex align-items-center" style={{padding: '10px', }}>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between"   style={{position: 'absolute', top: '0', right: '15%',  marginTop: '35px', }}>
              <a href="/home" className="logo d-flex align-items-center">
                {/* Uncomment the line below if you also wish to use an image logo */}
                {/* <img src="assets/img/logo.png" alt=""> */}
                <h1 className="d-flex align-items-center">{username}</h1>
              </a>

              
              <nav id="navbar" className="navbar">
                <ul>

                  <li><Link to="/home">Home</Link></li>
                  <li> <Link to="/mypost">My Post</Link></li>
                  <li><Link to="/author/add">Add Post</Link></li>
                 

                </ul>
                <Link onClick={logoutSubmit} to="/author/login">Logout</Link>
              </nav>{/* .navbar */}

            </div>
            {/* End Header */}
            </header>

       

            {/* ======= Breadcrumbs ======= */}

              <div className="container position-relative d-flex flex-column align-items-center">
                <h2>Welcome {username}</h2>
              </div>
              {/* End Breadcrumbs */}

            </div>

        );
            
}

export default Banner;