<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReactPostController;
use App\Http\Controllers\ReactCommentController;
use App\Http\Controllers\CountController;


    Route::post("/login/auth", [AuthorController::class, 'loginAuth']); 
    // Author Store is Register User
    Route::post("/author/store", [AuthorController::class, 'store']); 

// Route::group(['middleware' => ['auth:sanctum']], function() {

    //Author PAGE
    Route::post("/logout", [AuthorController::class, 'logout']);
    
    //Post PAGE
    Route::post("/post/store", [PostController::class, 'store']); 
    Route::delete("/post/delete{id}", [PostController::class, 'destroy']);
    Route::post("/post/edit{id}", [PostController::class, 'edit']);
    Route::post("/post/update{id}", [PostController::class, 'update']); 
    Route::post("/mypost{id}", [PostController::class, 'mypost']);
    
    Route::post("/author/posts{id}", [PostController::class, 'index']); 

    //COMMENT PAGE
    Route::post("/comment/posts{id}", [CommentController::class, 'posts']); 
    Route::post("/comment", [CommentController::class, 'index']); 
    Route::post("/comment/add", [CommentController::class, 'comment']); 
    Route::post("/comment/delete", [CommentController::class, 'destroy']); 

    //React Post 
    Route::post("/react/post", [ReactPostController::class, 'store']); 

    //React Comment
    Route::post("/react/comment", [ReactCommentController::class, 'store']); 

// });
    











    





