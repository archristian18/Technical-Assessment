import React, {useState} from "react";
import axios from 'axios';





function Count({props}) {


     //Show button when input text have value
     const [show, setShow] = useState(true);

    const post_id = props;

    const [countComment, setCountComment] = useState([]); 


            axios.get(`api/comment/count${post_id}`).then(res=>{
                if(res.status === 200)
                {
                    if(res.data.count < 1){
                        setShow(false);
                    }
                  setCountComment(res.data.count);
                }

            });

    return(
         <>

        {show ?  <><i className="bi bi-chat-dots" />    {countComment}  </> : "" }

        &nbsp;
  
        </>
    );

}

export default Count;