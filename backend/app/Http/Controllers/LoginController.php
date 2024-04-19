<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->plainTextToken;
            info($token);

            if ($user->tokens->where('name', 'AuthToken')->where('id', $token->id)->first()->check()) {
                return response()->json(['token' => $token], 200);
            } else {

                return response()->json(['error' => 'Token inválido'], 401);
            }
        }


        return response()->json(['error' => 'Credenciais inválidas'], 401);
    }
}
