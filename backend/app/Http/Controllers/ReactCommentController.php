<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\ReactComment;


class ReactCommentController extends Controller
{

    // Added Reaction in Comment post
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'name'=>'required',

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
            $check = DB::table('react_comments')
            ->where('comment_id', $request->comment_id)
            ->where('author_id',$request->author_id)
            ->first();
         
            if($check === NULL){
                ReactComment::create([
                    'name' => $request->name,
                    'comment_id' => $request->comment_id,
                    'author_id' =>  $request->author_id,
                  ]);
                  return response()->json([
                    'status'=> 200,
                    'message'=>'Added Successfully',
                ]);
            }
            else{
                // Update the ReactComment
                $data = ReactComment::find($check->id);
                $input = $request->all(); 
                $data->update($input);  
    
                return response()->json([
                    'status'=> 200,
                    'message'=>'Added Successfully',
                    'check'=> $data
                ]);
    
            }
    
        }
      

    }


    // React Comment Display
    public function index(Request $request)
    {


        $check = DB::table('react_comments')
        ->where('author_id',$request->author_id)
        ->where('comment_id',$request->comment_id)
        ->first();

        
        if($check === NULL){
            
            return response()->json([
                'status'=> 404,
                'message'=>'Fail Successfully',
            ]);

        }

        else{
                return response()->json([
                    'status'=> 200,
                    'message'=>'Added Successfully',
                    'check'=> $check->name
                    
                    
                ]);
                
        }

    
    }
}
