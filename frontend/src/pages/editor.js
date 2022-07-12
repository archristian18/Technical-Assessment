import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';


function editor(){

    const editorRef = useRef();

    function onClickHandler(){
        console.log(editorRef.current.getContent());
    }


return (

        <div>
            <Editor 
            apiKey = "dtwymj5xk7omrpqaur8d7hcncroyet743vbi5t6klspj7a7n"
            onInit={(evt, editor) => editorRef.current = editor }
            initialValue="<p>Default Text</p>"
            init={{
                menubar:false,
            }}
            />

            <button
            type="button"
            onClick={onClickHandler}
            >

            </button>
        </div>

);

}


export default editor;


// npm install --save tinymce @tinymce-react