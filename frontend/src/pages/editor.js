import React, {useState, useEffect, useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function editor(props){

    const editorRef = useRef(null);
  
    const log = () => {
      if (editorRef.current) {
  
        setPost(editorRef.current.getContent({format: 'text'}));
      }
    };

    
    const history = useHistory();
    const post_id = props.match.params.id;
    const [postInput, setPost] = useState({
        text: '',
        image: '',
        error_list: [],
    });
    
   // Comment Post Display
   useEffect(() => {

    axios.post(`api/post/edit${post_id}`).then(res=>{
        if(res.status === 200)
        {
            setPost(res.data.edit);
        }
        else if(res.status === 401){
            history.push('/author/login');
        }
    });

}, [props.match.params.id, history]);



  // Create const to get the event form data and link to backend
  const UpdatePost = (e) => {
    e.preventDefault();
    

    const fData = new FormData();

    fData.append('text', postInput);


    axios.post(`/api/post/update${post_id}`, fData).then(res => {
    // if else, Is for the Validation of form inputed
        if(res.data.status === 200)
        {
            swal("Success!",res.data.message,"success");

            history.push('/mypost');
        }
        else if(res.data.status === 422)
        {
            setPost({...postInput, error_list: res.data.validate_err });
        } 
    });
}

    //getting value input type event
    const handleInput = (e) => {
        e.persist();
        setPost({...postInput, [e.target.name]: e.target.value })
    }


return (

    <div>
    <form onSubmit={UpdatePost} >
  <div style={{margin: '2%'}}>
  <Editor
        apiKey='dtwymj5xk7omrpqaur8d7hcncroyet743vbi5t6klspj7a7n'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={postInput.text}
        init={{
          height: 500,
          menubar: false,
          plugins: ['image', 'image paste',
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'tinydrive', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            
          ],
          // tinydrive_token_provider: 'a409b76cf33397792b334b87c5b841853c86e312a01d9089a9050c7fafb7a06e',

          toolbar:'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log} className="btn btn-primary" 
          style={{margin: '1%'}}>Submit</button>
      </div>


    </form>
            </div>

);

}


export default editor;

