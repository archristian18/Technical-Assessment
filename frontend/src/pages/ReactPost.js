import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




function ReactPost({props}) {

    const select = {
      border: '0px'  

    }

    const [react, setReact] = useState();
    const author_id =  localStorage.getItem('id');
    const post_id = props;

    const history = useHistory();


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
      
 

        const data = {
            name:e.target.value,
            post_id:post_id,
            author_id:author_id,
        }
    
        axios.post(`/api/react/post`,  data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                window.location.reload();   
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/mypost');
            }
        });

    }
 
    return(
  
        
        <select name="react" id="details"  defaultValue={'DEFAULT'}  onChange={e => handleChange(e)} style={select}> 
        <option value="DEFAULT" id="0"  disabled hidden>{react}</option>
        <option value="👍" id="2" >👍</option>
        <option value="❤️" id="3">❤️</option>
        <option value="🙂" id="4">🙂</option> 
        </select>
  
   
    );

}

export default ReactPost;