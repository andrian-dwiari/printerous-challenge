<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\DB;
Use App\Models\RoleOrganization;
Use App\Models\User;
Use App\Models\Organization;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');
        	$data = User::all();
            return view('user/index')->with('username', Auth::user()->name)->with('user', $data)->with('organization', Organization::all());
        }
    }

    public function add_view() {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');
        	return view('user/add')->with('username', Auth::user()->name)->with('organization', Organization::all());
        }
    }

    public function simpan_tambah_akses_user_organisasi(Request $request) {
    	if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        	$tmp_id_user = rand(10,10000);
        	if ( $request->input('user_id_tmp') != '' ) $tmp_id_user = $request->input('user_id_tmp');

        	$organisasi_id = $request->input('akses_organisasi');

        	$check = RoleOrganization::where('user_id', $tmp_id_user)->where('organization_id', $organisasi_id)->get();

        	if ( count($check) == 0 ) {
        		try {
					$saveData = new RoleOrganization();
					$saveData->user_id = $tmp_id_user;
					$saveData->organization_id = $organisasi_id;
					$saveData->save();

					$returnData = Organization::find($organisasi_id);

					return response()->json([
		                'success' => true,
		                'message' => 'Simpan Data Berhasil!',
		                'id' => $saveData->id,
		                'user_id' => $saveData->user_id,
		                'data' => $returnData,
		            ], 200);
				} catch (Exception $e) {
					return response()->json([
		                'success' => false,
		                'error' => true,
		                'message' => 'Simpan Data Gagal!'
		            ], 400);
				}
        	}
        	else {
        		return response()->json([
	                'success' => false,
	                'error' => false,
	                'message' => 'Akses Organisasi sudah ditambahkan'
	            ], 201);
        	}
        }
    }

    public function hapus_akes_user_organisasi(Request $request) {
    	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        $id = $request->input('id');

        try {
			DB::table('role_organization')->where('id', $id)->delete();

	        return response()->json([
                'success' => true,
                'message' => 'Hapus Data Berhasil!'
            ], 200);
        } catch (Exception $e) {
        	return response()->json([
                'success' => false,
                'message' => 'Hapus Data Gagal!'
            ], 400);
        }
    }

    public function batal_tambah_user(Request $request) {
    	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        $id = $request->input('user_id_tmp');

        try {
			RoleOrganization::where('user_id', $id)->delete();

	        return response()->json([
                'success' => true,
                'message' => 'Hapus Data Berhasil!'
            ], 200);
        } catch (Exception $e) {
        	return response()->json([
                'success' => false,
                'message' => 'Hapus Data Gagal!'
            ], 400);
        }
    }

    public function simpan_tambah_user(Request $request) {
    	if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        	$tmp_id_user = rand(10,10000);
        	if ( $request->input('user_id_tmp') != '' ) $tmp_id_user = $request->input('user_id_tmp');

        	$tmp_id_user = $request->input('user_id_tmp');
        	$name = $request->input('name');
        	$email = $request->input('email');
        	$password = $request->input('password');
        	$role = $request->input('role');

        	$check = User::where('email', $email)->get();

        	if ( count($check) == 0 ) {
        		try {
					$saveData = new User();
					$saveData->name = $name;
					$saveData->email = $email;
					$saveData->password = Hash::make($password);
					$saveData->role = $role;
					$saveData->save();

					RoleOrganization::where('user_id', $tmp_id_user)->update(['user_id' => $saveData->id]);

					return response()->json([
		                'success' => true,
		                'message' => "Simpan Data Berhasil!",
		                'response' => $saveData,
		            ], 200);

				} catch (Exception $e) {
					return response()->json([
		                'success' => false,
		                'message' => 'Simpan Data Gagal!'
		            ], 400);
				}
        	}
        	else {
        		return response()->json([
	                'success' => false,
	                'error' => false,
	                'message' => 'Email User sudah didaftarkan'
	            ], 201);
        	}
        }
    }

    public function lihat_user(Request $request) {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        	$id = $request->input('id');

        	$user = User::find($id);

        	$akses = RoleOrganization::where('user_id', $user['id'])->get();

    		$arrAkses = [];
    		foreach ($akses as $k => $v) {
    			$arrAkses[] = (object) [
    				'id' => $v['id'],
    				'id_organization' => $v['organization_id'],
    				'name' => Organization::find($v['organization_id'])->name,
    				'email' => Organization::find($v['organization_id'])->email
    			];
    		}
    		unset($person);

    		$arr_user = (object) [
    			'id' => $user['id'],
    			'name' => $user['name'],
    			'email' => $user['email'],
    			'role' => str_replace('_', ' ', $user['role']),
    			'akses' => $arrAkses
    		];

        	unset($user);

			$data = (object) $arr_user;

            return response()->json([
                'success' => true,
                'message' => 'Lihat Data Berhasil!',
                'data' => $data
            ], 200);
        }
    }

    public function hapus_user(Request $request) {
    	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        $id = $request->input('id');

        try {
			User::where('id', $id)->delete();

			RoleOrganization::where('user_id', $id)->delete();

	        return response()->json([
                'success' => true,
                'message' => 'Hapus Data Berhasil!'
            ], 200);
        } catch (Exception $e) {
        	return response()->json([
                'success' => false,
                'message' => 'Hapus Data Gagal!'
            ], 400);
        }
    }

    public function ubah_user(Request $request) {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        	$id = $request->input('id');

        	$user = User::find($id);

        	$akses = RoleOrganization::where('user_id', $user['id'])->get();

    		$arrAkses = [];
    		foreach ($akses as $k => $v) {
    			$arrAkses[] = (object) [
    				'id' => $v['id'],
    				'id_user' => $v['user_id'],
    				'id_organization' => $v['organization_id'],
    				'name' => Organization::find($v['organization_id'])->name,
    				'email' => Organization::find($v['organization_id'])->email
    			];
    		}
    		unset($akses);

    		$list_role = [
    			[
    				'id' => 'administrator',
    				'name' => 'Administrator'
    			],
    			[
    				'id' => 'account_manager',
    				'name' => 'Account Manager'
    			],
    			[
    				'id' => 'member',
    				'name' => 'Member'
    			]
    		];

    		$arr_user = (object) [
    			'id' => $user['id'],
    			'name' => $user['name'],
    			'email' => $user['email'],
    			'role' => $user['role'],
    			'role_name' => ucwords(str_replace('_', ' ', $user['role'])),
    			'list_role' => $list_role,
    			'akses' => $arrAkses
    		];

        	unset($user);

			$data = (object) $arr_user;

            return response()->json([
                'success' => true,
                'message' => 'Lihat Data Berhasil!',
                'data' => $data
            ], 200);
        }
    }

    public function simpan_edit_user(Request $request) {
    	if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role != 'administrator' ) return redirect('/');

        	$id = $request->input('id');

        	$user = User::find($id);

        	$user->name = $request->input('name');
        	$user->email = $request->input('email');
        	$user->role = $request->input('role');

        	if ( $request->input('password') != '' ) {
        		$user->password = Hash::make($request->input('password'));
        	}

        	try {
				$user->save();

				return response()->json([
	                'success' => true,
	                'message' => 'Ubah Data Berhasil!',
	                'response' => $user,
	            ], 200);

			} catch (Exception $e) {
				return response()->json([
	                'success' => false,
	                'message' => 'Ubah Data Gagal!'
	            ], 400);
			}
        }
    }
}
