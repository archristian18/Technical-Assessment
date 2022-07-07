import React, {useState, useEffect} from "react";
import axios from 'axios';
import swal from 'sweetalert';




function ReactPost({props}) {

    const [react, setReact] = useState();
    const author_id =  localStorage.getItem('id');
    const comment_id = props;

    // const smile = "\u{1F642}";
    // const heart = "\u{1F497}";
    // const like = "\u{1F44D}";
 


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
                    // switch (res.data.check) {
                    //     case "like":
                    //         setReact(like);                         
                    //       break;
                    //     case "heart":
                    //         setReact(heart);
                    //       break;
                    //     case "smile":
                    //         setReact(smile);
                    //       break;
                    //     default:
                    //         setReact("");
                    //   }                    
                }

            });
    
        }, []);



         // const delete, Created to delete the specific id
         const handleChange = (e) => {
            e.preventDefault();
            
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
  
            
            <select name="react" id="details"  onChange={e => handleChange(e)}> 
                {/* <option value="NULL" id="1">{react}</option>
                <option value="like" id="2">{like}</option>
                <option value="heart" id="3">{heart}</option>
                <option value="smile" id="4">{smile}</option>  */}


                <option value="NULL" id="1">{react}</option>
                <option value="like" id="2">👍</option>
                <option value="heart" id="3">❤️</option>
                <option value="smile" id="4">🙂</option> 
                                             
            </select>
   
    );

}

export default ReactPost;