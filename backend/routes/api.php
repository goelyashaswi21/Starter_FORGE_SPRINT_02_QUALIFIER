<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\BoardListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;

Route::apiResource('boards', BoardController::class);
Route::post('lists', [BoardListController::class, 'store']);
Route::put('lists/{boardList}', [BoardListController::class, 'update']);
Route::delete('lists/{boardList}', [BoardListController::class, 'destroy']);
Route::post('cards', [CardController::class, 'store']);
Route::put('cards/{card}', [CardController::class, 'update']);
Route::delete('cards/{card}', [CardController::class, 'destroy']);
Route::post('tags', [TagController::class, 'store']);
Route::delete('tags/{tag}', [TagController::class, 'destroy']);
Route::post('members', [MemberController::class, 'store']);
Route::delete('members/{member}', [MemberController::class, 'destroy']);
