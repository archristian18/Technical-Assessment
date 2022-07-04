<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            
            $table->id();
            $table->string('text');
            $table->string('react');
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')
            ->references('id')->on('authors')->onDelete('cascade');
            $table->unsignedBigInteger('post_id');
            $table->foreign('post_id')
            ->references('id')->on('posts')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
