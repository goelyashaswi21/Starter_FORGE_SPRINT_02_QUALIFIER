<?php
namespace App\Http\Controllers;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller {
    public function store(Request $request) {
        $member = Member::create($request->validate(['board_id' => 'required|exists:boards,id', 'name' => 'required', 'email' => 'required|email']));
        return response()->json($member, 201);
    }
    public function destroy(Member $member) { $member->delete(); return response()->noContent(); }
}
