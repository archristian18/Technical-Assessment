<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $fillable = ['text', 'react', 'author_id', 'post_id'];

    public $timestamps = false;


    public function post(){
        return $this->belongsTo(Post::class);
    }
    
    
    public function author(){
        return $this->belongsTo(Author::class);
    }

    public function reactComment(){
        return $this->hasMany(ReactComment::class);
    }

}


