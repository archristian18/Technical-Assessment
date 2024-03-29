<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;

use App\Models\Post;
use App\Models\Author;
use App\Models\ReactPost;


use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


     // Display All Posts in Homepage
    public function index($Author_id) 
    {
     
        $varable = DB::table('authors')
            ->join('posts', 'authors.id', '=', 'posts.author_id')
            ->select('authors.*', 'posts.*', 'authors.id as author_id')
            ->get();

        $comments = Post::withCount('comment')->get();

        if($varable === NULL){
        return response()->json([
            'status'=> 401,
            'message'=>'Not Authentication',
      
        ]); 
        }
        else {
            
            $data = [];
        
            foreach($varable as $image) {
                $temp = [];
                $temp['image'] = URL::to('').$image->image;
                $temp['text'] = $image->text;
                $temp['id'] = $image->id;
                $temp['name'] = $image->name;
                $temp['Auth'] = $image->author_id;
                $temp['comment'] = $this->commentCount($image->id);
                $temp['react'] = $this->reactCount($image->id);
                $temp['reactName'] = $this->reactName($image->id, $Author_id);
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

        $users = DB::table('react_posts')
        ->where('post_id', $id)
        ->where('author_id', $author)
        ->get();

        $data = $users->pluck('name')->toArray();
     
        // $data = "" ;
        // foreach($users as $image) {
        //     $temp = [];
        //     $temp = $image->name;
        //     $data = $temp;
        // }   
        return $data;

    }


    // Display authors/users post,  Mypost page
    public function mypost($Author_id) 
    {
       
        $varable = DB::table('authors')
            ->join('posts', 'authors.id', '=', 'posts.author_id')
            ->where('authors.id', $Author_id)
            ->get();

        

        if($varable === NULL){
        return response()->json([
            'status'=> 401,
            'message'=>'Not Authentication',
      
        ]);
        }
        else {
            $data = [];
            foreach($varable as $image) {
                $temp = [];
                $temp['image'] = URL::to('').$image->image;
                $temp['text'] = $image->text;
                $temp['id'] = $image->id;
                $temp['name'] = $image->name;
                $temp['comment'] = $this->commentCount($image->id);
                $temp['react'] = $this->reactCount($image->id);
                $temp['reactName'] = $this->reactName($image->id, $Author_id);
                $data[] = $temp;
            }
            return response()->json([
                'status'=> 200,
                'posts'=>$data,
          
            ]);
        }
 
    }

    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

  
    // Authors Added Post
    public function store(Request $request) 
    {
       

        $validator = Validator::make($request->all(),[
            'text'=>'required',
            'image'=>'required',

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
            // Store the Image inside lavaravel storage
            $requestData = [];
            $fileName = time().$request->file('image')->getClientOriginalName();
            $file = $request->file('image');
            $path = $file->storeAs('image', $fileName, 'public');
            $requestData['image'] = '/storage/'.$path;


        Post::create([
            'text' => $request->text,
            'image' => $requestData['image'],
            'author_id' =>  $request->id
          ]);

                 
          return response()->json([
            'status'=> 200,
            'message'=>'Added Successfully',
        ]);
        }


    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     // Validated if post exist
    public function edit($id) 
    {
        $edit = Post::find($id);

        if($edit){
        return response()->json([
            'status'=> 200,
            'message'=>'Added Successfully',
            'edit' => $edit
        ]);
        }
        else{
            return response()->json([
                'status'=> 401,
                'message'=>'Not Found Post',
            ]); 
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


     // For edit the authors post
    public function update(Request $request, $id) 
    {

        $data = Post::find($id);
        $input = $request->all(); 
        // $input = json_decode($request->all());

        

        if($data === NULL){
            return response()->json([
                'status'=> 404,
                'message'=>'Not Updated',
            ]);
        }

        else {
            
                if($image = $request->file('image')){
                    $file_old =  public_path().$data->image;
                    unlink($file_old);

                    $fileName = time().$request->file('image')->getClientOriginalName();
                    $path = $request->file('image')->storeAs('image', $fileName, 'public');
                    $input["image"] = '/storage/'.$path;

                }
                else{
                    unset($input['image']);
                }
    
                 $data->update($input);    

                return response()->json([
                    'status'=> 200,
                    'message'=>'Updated Successfully',

                ]);

             
                    
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     // Delete authors post
    public function destroy($id)
    {
        $post = Post::find($id);

        // Check if exist in database
        if($post)
        {
            $post->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Post Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Post ID Found',
            ]);
        }
    }
}
