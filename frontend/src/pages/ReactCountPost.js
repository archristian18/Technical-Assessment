import React, {useState, useEffect} from "react";
import axios from 'axios';

function ReactCountPost({props}) {


     //Show button when input text have value
     const [show, setShow] = useState(true);

    const post_id = props;

    const [countComment, setCountComment] = useState([]); 
   


            useEffect(() => {
                const data = {
                    post_id:post_id,
                }
            axios.post(`api/reactpost/count`, data).then(res=>{
                if(res.status === 200)
                {
                    if(res.data.count < 1){
                        setShow(false);
                    }
                  setCountComment(res.data.count);
                }

            });
        }, []);
    return(
         <>

       
        {show ?   <> <i className="bi bi-person" /> {countComment}  </>: ''}
        &nbsp;
  
        </>
    );

}

export default ReactCountPost;