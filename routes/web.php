<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\UserController;

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
Route::post('/batal-tambah-organisasi', [OrganizationController::class, 'batal_tambah_organisasi'])->name('organisasi.batal_tambah_organisasi');
Route::post('/lihat-organisasi', [OrganizationController::class, 'lihat_organisasi'])->name('organisasi.lihat_organisasi');
Route::post('/hapus-organisasi', [OrganizationController::class, 'hapus_organisasi'])->name('organisasi.hapus_organisasi');
Route::post('/ubah-organisasi', [OrganizationController::class, 'ubah_organisasi'])->name('organisasi.ubah_organisasi');
Route::post('/edit-organisasi', [OrganizationController::class, 'simpan_edit_organisasi'])->name('organisasi.simpan_edit_organisasi');


// pic
Route::post('/tambah-pic-organisasi', [OrganizationController::class, 'simpan_tambah_pic_organisasi'])->name('organisasi.simpan_tambah_pic_organisasi');
Route::post('/edit-pic-organisasi', [OrganizationController::class, 'edit_pic_organisasi'])->name('organisasi.edit_pic_organisasi');
Route::post('/hapus-pic-organisasi', [OrganizationController::class, 'hapus_pic_organisasi'])->name('organisasi.hapus_pic_organisasi');

// user
Route::get('/user', [UserController::class, 'index'])->name('user');
Route::get('/tambah-user', [UserController::class, 'add_view'])->name('tambah-user');
Route::post('/tambah-user', [UserController::class, 'simpan_tambah_user'])->name('user.simpan_tambah_user');
Route::post('/lihat-user', [UserController::class, 'lihat_user'])->name('user.lihat_user');
Route::post('/ubah-user', [UserController::class, 'ubah_user'])->name('user.ubah_user');
Route::post('/edit-user', [UserController::class, 'simpan_edit_user'])->name('user.simpan_edit_user');
Route::post('/hapus-user', [UserController::class, 'hapus_user'])->name('user.hapus_user');
Route::post('/batal-tambah-user', [UserController::class, 'batal_tambah_user'])->name('user.batal_tambah_user');

// user akses organisasi
Route::post('/tambah-akses-user-organisasi', [UserController::class, 'simpan_tambah_akses_user_organisasi'])->name('user.simpan_tambah_akses_user_organisasi');
Route::post('/edit-akses-user-organisasi', [UserController::class, 'edit_akses_user_organisasi'])->name('user.edit_akses_user_organisasi');
Route::post('/hapus-akses-user-organisasi', [UserController::class, 'hapus_akes_user_organisasi'])->name('user.hapus_akes_user_organisasi');
