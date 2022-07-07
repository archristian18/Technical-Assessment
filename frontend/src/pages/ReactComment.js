import React, {useState, useEffect} from "react";
import axios from 'axios';
import swal from 'sweetalert';


function ReactComment({props}) {

    const [react, setReact] = useState();
    const author_id =  localStorage.getItem('id');
    const comment_id = props;
    const [selected, setSelected] = useState("");

    const select = {
        border: '0px'  
  
      }
        // Getting the value database backend
        useEffect(() => {
            const data = {
                comment_id:comment_id,
                author_id:author_id,
            }

            axios.post(`api/react/comment/view`, data).then(res=>{
                if(res.data.status === 200)
                {
                    setReact(res.data.check);
                }

            });
    
        }, []);



         // const delete, Created to delete the specific id
         const handleChange = (e) => {
            e.preventDefault();

            const selected = e.target.value;
            setSelected(selected);

            const data = {
                name:e.target.value,
                comment_id:comment_id,
                author_id:author_id,
            }
    
            axios.post(`/api/react/comment`,  data).then(res=>{
                if(res.data.status === 200)
                {
                    swal("Success!",res.data.message,"success");
                  
                }
                else if(res.data.status === 404)
                {
                    swal("Error",res.data.message,"error");
                  
                }
            });
        }
    
 
    return(
  
            
        <select name="react" id="details"   defaultValue={'DEFAULT'}   onChange={e => handleChange(e)} style={select}> 
        <option value="DEFAULT" id="0"  disabled hidden>{react}</option>
        <option value="👍" id="2" >👍</option>
        <option value="❤️" id="3">❤️</option>
        <option value="🙂" id="4">🙂</option> 
                                         
            </select>
   
    );

}

export default ReactComment;