<?php
namespace App\Http\Controllers;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller {
    public function store(Request $request) {
        $card = Card::create($request->validate(['list_id' => 'required|exists:lists,id', 'title' => 'required', 'description' => 'nullable', 'position' => 'integer', 'due_date' => 'nullable|date']));
        return response()->json($card->load(['tags', 'members']), 201);
    }
    public function update(Request $request, Card $card) {
        $card->update($request->validate(['list_id' => 'nullable|exists:lists,id', 'title' => 'nullable', 'description' => 'nullable', 'position' => 'nullable|integer', 'due_date' => 'nullable|date']));
        if ($request->has('tag_ids')) $card->tags()->sync($request->tag_ids);
        if ($request->has('member_ids')) $card->members()->sync($request->member_ids);
        return $card->load(['tags', 'members']);
    }
    public function destroy(Card $card) { $card->delete(); return response()->noContent(); }
}
