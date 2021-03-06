<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Author;

class CommentController extends Controller
{
        
    // Added Comment in Post
    public function comment(Request $request) 
    {   
    
        
        $validator = Validator::make($request->all(),[
                'comment'=>'required',
        ]);

                
                if($validator->fails())
                {
                    return response()->json([
                        'status'=> 422,
                        'validate_err'=> $validator->messages(),
                    ]);
                }
                else
                {            
                    $comment = Comment::create([
                        'text' => $request->comment,
                        'author_id' =>  $request->author_id,
                        'post_id' =>  $request->id
                      ]);


                      return response()->json([
                        'status'=> 200,
                        'message'=>'Post Comment Successfully'
                    ]);
                       
                }
    }

    // Display Comment in specific Post
    public function index(Request $request) 
    {   

  

                // get comments
                $varable = DB::table('authors')
                ->join('comments', 'authors.id', '=', 'comments.author_id')
                ->where('post_id', $request->post_id)
                ->select('authors.*', 'comments.*','comments.id as comment_id', 'authors.id as author_id')
                ->get();
     
                $post = Post::find($request->post_id);
               
           
            
        if($varable === null)
        {
            $varable = Post::find($request->post_id);
            return response()->json([
                'status'=> 404,
                'message' => 'No Post ID Found',
                'comment'=>$varable,
                'author_id'=>$varable->author_id,

            ]);
        }
        else
        {     



            $data = [];
            foreach($varable as $image) {
                $temp = []; 
               
                if($post->author_id == $request->author_id){
                    $temp['author_id'] = $request->author_id;
                }
                else if($image->author_id == $request->author_id){
                    $temp['author_id'] = $request->author_id;
                }
                else{
                    $temp['author_id'] = $image->author_id;
                }
             
                $temp['id'] = $image->comment_id;
                $temp['name'] = $image->name;
                $temp['text'] = $image->text;
                $temp['reactName'] = $this->reactName($image->comment_id, $request->author_id);
                $data[] = $temp;
            }

            return response()->json([
                'status'=> 200,
                'message'=>'Post Comment Successfully',
                'comment'=>$data,

            ]);

            
        }

    }




         // Delete authors post
    public function destroy(Request $request)
         {

            $validator = Validator::make($request->all(),[
                'id'=>'required',
                'author_id'=>'required' 
            ]);
    
            
            if($validator->fails())
            {
                return response()->json([
                    'status'=> 422,
                    'validate_err'=> $validator->messages(),
                ]);
            }
            else
            {             

                //post get all post specific id
                $post = Post::where('id', $request->post_id)
                ->first();


                //delete comment All Comment
                $comment = Comment::where('id', $request->id)
                ->where('post_id', $request->post_id)
                ->first();


                if($comment === null){
                    return response()->json([
                        'status'=> 404,
                        'message'=>'Fail Deleted Comment',
                    ]);
                
                // Can delete all comments on authors/users post
                }else if($request->author_id == $post->author_id){

                    $comment->delete();
                    return response()->json([
                        'status'=> 200,
                        'message'=>'Comment Deleted Successfully',                  
                    ]);  
                }

                // Delete authors comment to other post
                else if($request->author_id == $comment->author_id){

                    $comment->delete();
                    return response()->json([
                       'status'=> 200,
                        'message'=>'Comment Deleted Successfully',     
                    ]);

                 // Can't Delete with other's comments post
                }else{
                    return response()->json([
                        'status'=> 404,
                         'message'=>'Fail Deleted Comment',     
                     ]); 
                }

            }
         }

         // Display specific post inside comment page
         public function posts($id) 
         {
            

             $varable = DB::table('authors')
                 ->join('posts', 'authors.id', '=', 'posts.author_id')
                 ->where('posts.id', $id)
                 ->select()
                 ->get();


                 $data = [];

     

             if($varable === NULL){
             return response()->json([
                 'status'=> 401,
                 'message'=>'Not Authentication',
           
             ]);
             }
             else {
                foreach($varable as $image) {
                    $temp = [];
                    $temp['image'] = URL::to('').$image->image;
                    $temp['text'] = $image->text;
                    $temp['id'] = $image->id;
                    $temp['name'] = $image->name;
                    $temp['comment'] = $this->commentCount($image->id);
                    $temp['react'] = $this->reactCount($image->id);
                    $temp['reactName'] = $this->reactName($image->id, $image->author_id);
                    $data[] = $temp;
                }
                 return response()->json([
                     'status'=> 200,
                     'posts'=>$data,
               
                 ]);
             }


         }
            
    //count all comment
    public function commentCount($id) {
        //query return count or size of comment

        $users = DB::table('comments')
        ->where('post_id', $id)
        ->count();

        return $users;
    }

    //count all reacts
    public function reactCount($id){

        // $comment = Comment::all();
        $users = DB::table('react_posts')
        ->where('post_id', $id)
        ->count();
        
        if($users === NULL){
            return "";
            }

        else{
        return $users;
            }
    }



        //get reacts emoji
        public function reactName($id, $author){

            $users = DB::table('react_comments')
            ->where('comment_id', $id)
            ->where('author_id', $author)
            ->get();
    
         
            $data = "" ;
            foreach($users as $image) {
                $temp = [];
                $temp = $image->name;
                $data = $temp;
            }   
            return $data;
    
        }



}
