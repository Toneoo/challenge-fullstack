<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rota de login
Route::post('/login', [LoginController::class, 'login']);

// Rota de logout
Route::post('/logout', [LoginController::class, 'logout']);

// Aplicar o middleware 'auth:sanctum' globalmente para todas as rotas de produtos
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('produtos', ProductController::class);
});

// Rota para retornar informações do usuário autenticado
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

