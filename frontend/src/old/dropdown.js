import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import '../assets/dropdown/style.css';



function ReactPost({props}) {

    const [react, setReact] = useState();
    const author_id =  localStorage.getItem('id');
    const post_id = props;
    const [selected, setSelected] = useState("");

    const history = useHistory();


        // Getting the value database backend
        useEffect(() => {
            const data = {
                post_id:post_id,
                author_id:author_id,
            }

            axios.post(`api/react/post/view`, data).then(res=>{
                if(res.data.status === 200)
                {

                    setReact(res.data.check);

                }

            });
    
        }, []);

    const handleChange = (e) => {
        e.preventDefault();
      
        const  selected = e.target.value;
        setSelected(selected);

        const data = {
            name:e.target.value,
            post_id:post_id,
            author_id:author_id,
        }
    
        axios.post(`/api/react/post`,  data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                history.push('/home');
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/mypost');
            }
        });

    }
 
    return(
  
<div class="dropup">
  <span role="img" aria-labelledby="like" value="👍">👍</span>
  <div class="dropup-content">

  <div  onChange={e => handleChange(e)}>
  <span role="img" aria-labelledby="like" value="👍">👍</span>
  <span role="img" aria-labelledby="smile" value="🙂">🙂</span>
  <span role="img" aria-labelledby="love" value="❤️" >❤️</span>
        
    </div>

  </div>
</div>



 
   
    );

}

export default ReactPost;