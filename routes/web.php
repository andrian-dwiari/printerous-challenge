<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrganizationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LoginController::class, 'index'])->name('login');

// register
Route::get('/register', [RegisterController::class, 'index'])->name('register.index');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store');

// login
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'check_login'])->name('login.check_login');

// dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// logout
Route::get('/logout', [DashboardController::class, 'logout']);

// organization
Route::get('/organisasi', [OrganizationController::class, 'index'])->name('organisasi');
Route::get('/tambah-organisasi', [OrganizationController::class, 'add_view'])->name('tambah-organisasi');
Route::post('/tambah-organisasi', [OrganizationController::class, 'simpan_tambah_organisasi'])->name('organisasi.simpan_tambah_organisasi');

// pic
Route::post('/tambah-pic-organisasi', [OrganizationController::class, 'simpan_tambah_pic_organisasi'])->name('organisasi.simpan_tambah_pic_organisasi');
Route::post('/edit-pic-organisasi', [OrganizationController::class, 'edit_pic_organisasi'])->name('organisasi.edit_pic_organisasi');
Route::post('/hapus-pic-organisasi', [OrganizationController::class, 'hapus_pic_organisasi'])->name('organisasi.hapus_pic_organisasi');
