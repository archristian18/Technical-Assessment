<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactComment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'comment_id',
        'author_id'
    ];

    public function comment(){
        return $this->belongsTo(ReactComment::class);
    }

    public function author(){
        return $this->belongsTo(Author::class);
    }
}
