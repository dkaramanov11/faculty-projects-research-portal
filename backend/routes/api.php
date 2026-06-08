<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('projects', ProjectController::class);
Route::apiResource('categories', CategoryController::class);

Route::get('/users', [UserController::class, 'index']);

Route::post('/projects/{project}/participants/{user}', [ProjectController::class, 'addParticipant']);
Route::delete('/projects/{project}/participants/{user}', [ProjectController::class, 'removeParticipant']);
