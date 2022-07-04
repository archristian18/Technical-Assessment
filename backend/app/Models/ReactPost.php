<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactPost extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'post_id',
        'author_id'
    ];

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function author(){
        return $this->belongsTo(Author::class);
    }
}
