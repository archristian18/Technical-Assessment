<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Author;


class AuthorController extends Controller
{

    // Add Account Authors, 
    public function store(Request $request)
    {
       

        $validator = Validator::make($request->all(),[
            'name'=>'required|unique:authors|min:5',
            'password'=>'required|min:5'
        ]);

        // Validation Register
        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            // Added Account Author/User        
            Author::create([
                'name' =>  $request->name, 
                'password' => Hash::make($request->password)
            ]);
       
            return response()->json([
                'status'=> 200,
                'message'=>'Added Successfully',
            ]);
        }

    }

    // Login Authors
    public function loginAuth(Request $request) 
    {

        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'password'=>'required' 
        ]);

        
        // Check request is available
        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
        
            // Author/User exist name 
            $db = Author::where([
                ['name', $request->name],
            ])->first();
           
            // Check if the author/user is not exist
            if($db === null){
                return response()->json([
                    'status'=> 401,
                    'message'=>'Not Registered',
                ]);
            }
            // check if the password is correct
            else if(Hash::check($request->password, $db->password)){

                   $token =  $db->createToken($db->name.'token')->plainTextToken;   

                    return response()->json([
                        'status'=> 200,
                        'message'=>'Successfully Login',
                        'token' => $token,
                        'id' => $db->id,
                        'name' => $db->name,
                        'password' =>$db->password
                    ]); 
            }
            else{
                    return response()->json([
                        'status'=> 404,
                        'message'=>'Fail to Login, Not Match username or Password',
                    ]); 
                
            }


        }
    }
    
    public function logout(Request $request){ 
        
        // Remove tokens
        if($request){
            auth()->user()->tokens()->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Logged Out Successfully',
            ]); 
            }
            else{
                return response()->json([
                    'status'=> 404,
                    'message'=>'Fail to Logged Out',
                ]); 
            }
    }

}
