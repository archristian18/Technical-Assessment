<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Author;
use App\Models\ReactPost;

class CountController extends Controller
{
    
    public function comment($id){


        //post ID 5

        // $comment = Comment::all();
        $users = DB::table('comments')
        ->where('post_id', $id)
        ->count();


        if($users === NULL){
            return response()->json([
                'status'=> 401,
                'message'=>'Not Authentication',
        
            ]);
            }
            else {
                return response()->json([
                    'status'=> 200,
                    'count'=>$users,
            
                ]);
            }
     }

     public function postReact(Request $request){


        // $comment = Comment::all();
        $users = DB::table('react_posts')
        ->where('post_id', $request->post_id)
        ->count();


        if($users === NULL){
            return response()->json([
                'status'=> 401,
                'message'=>'Not Authentication',
        
            ]);
            }
            else {
                return response()->json([
                    'status'=> 200,
                    'count'=>$users,
            
                ]);
            }
     }
}
