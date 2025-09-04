<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();  // Auto-incrementing ID
            $table->string('title');  // For post title, e.g., "The Libertines: My Favorite Band"
            $table->text('content');  // For the body text
            $table->string('image')->nullable();  // Path to uploaded image (optional)
            $table->softDeletes();
            $table->timestamps();  // Created/updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
