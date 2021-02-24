<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;

class RegisterController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index() {
        if ( Auth::guest() ) {
            return view('register');
        }
        else {
            return redirect('/dashboard');
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request) {
        $nama_lengkap   = $request->input('nama_lengkap');
        $email          = $request->input('email');
        $password       = $request->input('password');
        $role           = $request->input('role');

        $user = User::create([
            'name'      => $nama_lengkap,
            'email'     => $email,
            'password'  => Hash::make($password),
            'role'      => $role,
        ]);    

        if($user) {
            return response()->json([
                'success' => true,
                'message' => 'Register Berhasil!'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Register Gagal!'
            ], 400);
        }

    }
}
