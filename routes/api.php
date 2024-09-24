<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ModelController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    return $user;
});


Route::get('/models', [ModelController::class, 'index']);
Route::get('/models/{model}', [ModelController::class, 'show']);
Route::post('/models', [ModelController::class, 'store']);
Route::put('/models/{model}', [ModelController::class, 'update']);
Route::delete('/models/{model}', [ModelController::class, 'destroy']);

