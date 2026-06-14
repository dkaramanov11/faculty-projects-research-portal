<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectRequestController;

/*
|--------------------------------------------------------------------------
|                              Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
|                             Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    */

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Participants
    |--------------------------------------------------------------------------
    */

    Route::post('/projects/{project}/participants/{user}', [ProjectController::class, 'addParticipant']);

    Route::delete('/projects/{project}/participants/{user}', [ProjectController::class, 'removeParticipant']);

    /*
   |--------------------------------------------------------------------------
   | Project requests
   |--------------------------------------------------------------------------
   */

    Route::get('/project-requests', [ProjectRequestController::class, 'index']);

    Route::post('/projects/{project}/requests', [ProjectRequestController::class, 'store']);

    Route::post('/project-requests/{projectRequest}/accept', [ProjectRequestController::class, 'accept']);

    Route::post('/project-requests/{projectRequest}/reject', [ProjectRequestController::class, 'reject']);

    Route::post('/projects/{project}/invite/{user}', [ProjectRequestController::class, 'invite']);

    Route::get('/inbox', [ProjectRequestController::class, 'inbox']);
});
