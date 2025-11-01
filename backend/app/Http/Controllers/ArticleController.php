<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::withCount('comments')
            ->orderBy('created_at', 'desc')
            ->get(['id', 'title', 'content', 'created_at']);

        return response()->json($articles);
    }

    public function show($id): JsonResponse
    {
        $article = Article::with(['comments' => function($query) {
            $query->orderBy('created_at', 'desc');
        }])->findOrFail($id);

        return response()->json($article);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::create($request->all());

        return response()->json($article, 201);
    }

    public function addComment(Request $request, $id): JsonResponse
    {
        $request->validate([
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::findOrFail($id);

        $comment = $article->comments()->create($request->all());

        return response()->json($comment, 201);
    }
}