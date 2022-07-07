import React, {useState} from "react";
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
    const [selected, setSelected] = useState("");

    const history = useHistory();



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
  
        
        <select name="react" id="details"  onChange={e => handleChange(e)} style={select}> 
        <option value="NULL" id="0" selected disabled hidden>{react}</option>
        <option value="👍" id="2" >👍</option>
        <option value="❤️" id="3">❤️</option>
        <option value="🙂" id="4">🙂</option> 
        </select>
  
   
    );

}

export default ReactPost;