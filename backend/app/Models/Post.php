<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'text',
        'image',
        'react',
        'author_id'
    ];

    public function author(){
        return $this->belongsTo(Author::class);
    }

    public function comment(){
        return $this->hasMany(Comment::class);
    }

    
    public function reactPost(){
        return $this->hasMany(ReactPost::class);
    }


}
