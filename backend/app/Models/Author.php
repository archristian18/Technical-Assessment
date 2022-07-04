<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Author extends Authenticatable
{


    use HasApiTokens, HasFactory, Notifiable;
    
    public $timestamps = false;
    protected $table = 'authors';
    protected $fillable = [
        'name',
        'password'
    ];

    public function post(){
        return $this->hasMany(Post::class);
    }

    public function reactPost(){
        return $this->hasMany(ReactPost::class);
    }

    public function reactComment(){
        return $this->hasMany(ReactComment::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


}
