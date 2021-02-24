<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class DashboardController extends Controller
{
	public function index() {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
            return view('dashboard/index')->with('username', Auth::user()->name);
        }
    }

	public function logout(Request $request) {
		Auth::logout();
		return redirect('/');
	}
}
