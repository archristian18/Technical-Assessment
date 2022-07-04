import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




function ReactPost({props}) {

    const [react, setReact] = useState();
    const author_id =  localStorage.getItem('id');
    const post_id = props;
    // const smile = "\u{1F642}";
    // const heart = "\u{1F497}";
    // const like = "\u{1F44D}";
 
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
                    // swal("Success!",res.data.message,"success");
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
                    //          setReact("");

                    //   }
                    
                    // history.push('/author/posts');
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
                history.push('/author/posts');
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/mypost');
            }
        });

    }
 
    return(
  
            
            <select name="react" id="details"  onChange={e => handleChange(e)}> 
                {/* <option value="NULL" id="1">{react}</option>
                <option value="like" id="2">{like}</option>
                <option value="heart" id="3">{heart}</option>
                <option value="smile" id="4">{smile}</option> 
                                              */}

                <option value="NULL" id="1">{react}</option>
                <option value="like" id="2">👍</option>
                <option value="heart" id="3">❤️</option>
                <option value="smile" id="4">🙂</option> 
            </select>
   
    );

}

export default ReactPost;