<?php
namespace App\Http\Controllers;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller {
    public function store(Request $request) {
        $tag = Tag::create($request->validate(['board_id' => 'required|exists:boards,id', 'name' => 'required', 'color' => 'nullable']));
        return response()->json($tag, 201);
    }
    public function destroy(Tag $tag) { $tag->delete(); return response()->noContent(); }
}
