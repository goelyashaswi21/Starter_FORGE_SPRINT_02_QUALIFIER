<?php
namespace App\Http\Controllers;
use App\Models\BoardList;
use Illuminate\Http\Request;

class BoardListController extends Controller {
    public function store(Request $request) {
        $list = BoardList::create($request->validate(['board_id' => 'required|exists:boards,id', 'name' => 'required', 'position' => 'integer']));
        return response()->json($list, 201);
    }
    public function update(Request $request, BoardList $boardList) {
        $boardList->update($request->validate(['name' => 'nullable', 'position' => 'nullable|integer']));
        return $boardList;
    }
    public function destroy(BoardList $boardList) { $boardList->delete(); return response()->noContent(); }
}
