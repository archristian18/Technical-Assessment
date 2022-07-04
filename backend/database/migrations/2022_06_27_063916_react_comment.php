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
        Schema::create('react_comments', function (Blueprint $table) {
            
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('comment_id');
            $table->foreign('comment_id')
            ->references('id')->on('comments')->onDelete('cascade');
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')
            ->references('id')->on('authors')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('react_comments');
    }
};
