import React from 'react';





function Banner() {

  const name =  localStorage.getItem('name');

      return (          
          

            <div className="breadcrumbs d-flex align-items-center"  style={{backgroundImage: 'url("../../assets/img/blog-header.jpg")'}} >
            {/* ======= Breadcrumbs ======= */}

              <div className="container position-relative d-flex flex-column align-items-center">
                <h2>Welcome {name}</h2>
              </div>
              {/* End Breadcrumbs */}

            </div>

        );
            
}

export default Banner;