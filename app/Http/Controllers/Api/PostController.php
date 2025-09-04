<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Exception;
use App\Models\Post;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
        $posts = Post::all();
        \Log::info('Fetched posts:', ['posts' => $posts->toArray()]);
        return response()->json([
            'status' => 200,
            'message' => 'posts',
            'data' => $posts
        ], 200);
    } catch (Exception $e) {
        \Log::error('Error in index: ' . $e->getMessage());
        return response()->json([
            'status' => 500,
            'message' => 'Error al obtener la lista de usuarios: ' . $e->getMessage(),
            'data' => null
        ], 500);
    }
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048', // Max 2MB
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images', 'public');
        }

        return Post::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post) {
        return $post; // Get single post
    }

    /**
     * Update the specified resource in storage.
     */
        public function update(Request $request, Post $post) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image); // Delete old image
            }
            $validated['image'] = $request->file('image')->store('images', 'public');
        }

        $post->update($validated);
        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Post $post) {
        if ($post->image) {
            Storage::disk('public')->delete($post->image); // Delete image
        }
        $post->delete();
        return response()->json(['message' => 'Post deleted']);
    }
}
