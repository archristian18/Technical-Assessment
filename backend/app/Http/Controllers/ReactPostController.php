<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\ReactPost;

class ReactPostController extends Controller
{


    // Added Reaction in Post post
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
       
            $check = DB::table('react_posts')
            ->where('post_id', $request->post_id)
            ->where('author_id',$request->author_id)
            ->first();
    
        
            if($check === NULL){

            ReactPost::create([

                'name' => $request->name,
                'post_id' => $request->post_id,
                'author_id' =>  $request->author_id,

            ]);
            
            return response()->json([
                'status'=> 200,
                'message'=>'Added Successfully',

            ]);

            }
            
            else{

            // Update React in post
                $data = ReactPost::find($check->id);
                $input = $request->all(); 
                $data->update($input);  


                return response()->json([
                    'status'=> 200,
                    'message'=>'Added Successfully',
                    'react' => $check->name
                ]);

            }

        }        

    }

    // React Post Display
    public function index(Request $request)
    {
        
        $check = DB::table('react_posts')
        ->where('author_id',$request->author_id)
        ->where('post_id',$request->post_id)
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
