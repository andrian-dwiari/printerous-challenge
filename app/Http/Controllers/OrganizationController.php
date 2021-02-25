<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Image;
use Illuminate\Support\Facades\DB;
Use App\Models\Organization;
Use App\Models\Person;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
Use App\Models\RoleOrganization;

class OrganizationController extends Controller
{
    public function index() {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	$organization = Organization::all();

        	$arrOrganization = [];
        	foreach ($organization as $key => $value) {

        		$person = Person::where('organization_id', $value['id'])->get();

        		$arrPic = [];
        		foreach ($person as $k => $v) {
        			$arrPic[] = $v['name'];
        		}
        		unset($person);

                $checkRoleOrganization = RoleOrganization::where('user_id',Auth::user()->id)->where('organization_id',$value['id'])->get();

                $access = false;
                if ( count($checkRoleOrganization) > 0 ) {
                    $access = true;
                }

        		$arr_organization[] = (object) [
        			'id' => $value['id'],
        			'name' => $value['name'],
        			'email' => $value['email'],
        			'phone' => $value['phone'],
        			'website' => $value['website'],
        			'logo' => url('/'.$value['logo']),
        			'pic' => implode(' | ', $arrPic),
                    'access' => $access
        		];
        	}
        	unset($organization);

			$data = (object) $arr_organization;

            return view('organization/index')->with('username', Auth::user()->name)->with('organization', $data);
        }
    }

    public function add_view() {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');
        	return view('organization/add')->with('username', Auth::user()->name);
        }
    }

    public function simpan_tambah_pic_organisasi(Request $request) {
    	if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

        	$tmp_id_organization = rand(10,10000);
        	if ( $request->input('organisasi_id_tmp') != '' ) $tmp_id_organization = $request->input('organisasi_id_tmp');

        	$name = $request->input('name');
        	$email = $request->input('email');
        	$phone = $request->input('phone');

        	if ( $request->hasFile('image') ) {
        		if ( $request->file('image')->getMimeType() == 'image/jpeg' || $request->file('image')->getMimeType() == 'image/jpg' || $request->file('image')->getMimeType() == 'image/png' ) {

					$filename = $this->storeImage($request->file('image'),'avatar');

					try {

						$saveImage = new Person();
						$saveImage->organization_id = $tmp_id_organization;
						$saveImage->name = $name;
						$saveImage->email = $email;
						$saveImage->phone = $phone;
						$saveImage->avatar = $filename;
						$saveImage->save();

						return response()->json([
			                'success' => true,
			                'message' => 'Simpan Data Berhasil!',
			                'response' => $saveImage,
			                'public_url' => url('/'.$saveImage->avatar)
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
		                'message' => 'Format Avatar harus (jpg/jpeg/png)!'
		            ], 400);
        		}
        	}
        	else {
        		return response()->json([
	                'success' => false,
	                'message' => 'Avatar harus diisi!'
	            ], 400);
        	}
        }
    }

    public function edit_pic_organisasi(Request $request) {
    	if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

            $id = $request->input('id');

        	$person = Person::find($id);

        	$tmp_filename = $person->avatar;

        	$person->name = $request->input('name');
        	$person->email = $request->input('email');
        	$person->phone = $request->input('phone');

        	$ubahAvatar = false;

        	if ( $request->hasFile('image') ) {
        		if ( $request->file('image')->getMimeType() == 'image/jpeg' || $request->file('image')->getMimeType() == 'image/jpg' || $request->file('image')->getMimeType() == 'image/png' ) {

					$filename = $this->storeImage($request->file('image'),'avatar');
					$person->avatar = $filename;

					$ubahAvatar = true;
        		}
        		else {
        			return response()->json([
		                'success' => false,
		                'message' => 'Format Avatar harus (jpg/jpeg/png)!'
		            ], 400);
        		}
        	}

        	try {
				$person->save();

				Storage::delete(Str::replaceFirst('storage/','public/', $tmp_filename));

				return response()->json([
	                'success' => true,
	                'message' => 'Ubah Data Berhasil!',
	                'response' => $person,
	                'public_url' => url('/'.$person->avatar),
	                'ubah_avatar' => $ubahAvatar
	            ], 200);

			} catch (Exception $e) {
				return response()->json([
	                'success' => false,
	                'message' => 'Ubah Data Gagal!'
	            ], 400);
			}
        }
    }

    public function hapus_pic_organisasi(Request $request) {
    	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

        $id = $request->input('id');

        $person = Person::find($id);

        $tmp_filename = $person->avatar;

        try {
			$person->delete();

			Storage::delete(Str::replaceFirst('storage/','public/', $tmp_filename));

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

    public function batal_tambah_organisasi(Request $request) {
    	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

        $id = $request->input('id');

        try {
			$person = Person::where('organization_id', $id)->get();

			$tmp_list_avatar_pic = [];
			foreach ($person as $key => $value) {
				$tmp_list_avatar_pic[] = Str::replaceFirst('storage/','public/', $value->avatar);
			}
			unset($person);

			Person::where('organization_id', $id)->delete();

			Storage::delete($tmp_list_avatar_pic);

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

    public function simpan_tambah_organisasi(Request $request) {
    	if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

        	$tmp_id_organization = rand(10,10000);
        	if ( $request->input('organisasi_id_tmp') != '' ) $tmp_id_organization = $request->input('organisasi_id_tmp');

        	$tmp_id_organization = $request->input('organisasi_id_tmp');
        	$name = $request->input('name');
        	$email = $request->input('email');
        	$phone = $request->input('phone');
        	$website = $request->input('website');

        	if ( $request->hasFile('image') ) {
        		if ( $request->file('image')->getMimeType() == 'image/jpeg' || $request->file('image')->getMimeType() == 'image/jpg' || $request->file('image')->getMimeType() == 'image/png' ) {

					$filename = $this->storeImage($request->file('image'),'logo');

					try {

						$saveImage = new Organization();
						$saveImage->name = $name;
						$saveImage->email = $email;
						$saveImage->phone = $phone;
						$saveImage->website = $website;
						$saveImage->logo = $filename;
						$saveImage->save();

						Person::where('organization_id', $tmp_id_organization)->update(['organization_id' => $saveImage->id]);

						return response()->json([
			                'success' => true,
			                'message' => "Simpan Data Berhasil! \n Silahkan request hak akses ke administrator untuk mengedit dan menghapus data organisasi yang baru ditambahkan",
			                'response' => $saveImage,
			                'public_url' => url('/'.$saveImage->logo)
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
		                'message' => 'Format Logo harus (jpg/jpeg/png)!'
		            ], 400);
        		}
        	}
        	else {
        		return response()->json([
	                'success' => false,
	                'message' => 'Logo harus diisi!'
	            ], 400);
        	}
        }
    }

    public function storeImage($value,$type_image) {
        // destination path relative to the disk above
        $destination_path = "public/images/".$type_image;

        // 0. Make the image
        $image = Image::make($value)->fit(100)->encode('jpg', 90);

        // 1. Generate a filename.
        $filename = md5($value.time().$type_image).'.jpg';

        // 2. Store the image on disk.
        Storage::put($destination_path.'/'.$filename, $image->stream());

        // // 3. Delete the previous image, if there was one.
        // Storage::delete(Str::replaceFirst('storage/','public/', $attribute_name));

        // 4. Save the public path to the database
        // but first, remove "public/" from the path, since we're pointing to it
        // from the root folder; that way, what gets saved in the db
        // is the public URL (everything that comes after the domain name)
        $public_destination_path = Str::replaceFirst('public/', 'storage/', $destination_path);
        
        return $public_destination_path.'/'.$filename;
    }

    public function lihat_organisasi(Request $request) {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	$id = $request->input('id');

        	$organization = Organization::find($id);

        	$person = Person::where('organization_id', $organization['id'])->get();

    		$arrPic = [];
    		foreach ($person as $k => $v) {
    			$arrPic[] = (object) [
    				'id' => $v['id'],
    				'name' => $v['name'],
    				'email' => $v['email'],
    				'phone' => $v['phone'],
    				'avatar' => url('/'.$v['avatar'])
    			];
    		}
    		unset($person);

    		$arr_organization = (object) [
    			'id' => $organization['id'],
    			'name' => $organization['name'],
    			'email' => $organization['email'],
    			'phone' => $organization['phone'],
    			'website' => $organization['website'],
    			'logo' => url('/'.$organization['logo']),
    			'pic' => $arrPic
    		];

        	unset($organization);

			$data = (object) $arr_organization;

            return response()->json([
                'success' => true,
                'message' => 'Lihat Data Berhasil!',
                'data' => $data
            ], 200);
        }
    }

    public function hapus_organisasi(Request $request) {
    	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

        $id = $request->input('id');

        if ( Auth::user()->role == 'account_manager' ) {
            $checkRoleOrganization = RoleOrganization::where('user_id',Auth::user()->id)->where('organization_id',$id)->get();

            if ( count($checkRoleOrganization) == 0 ) return redirect('/organisasi');
            unset($checkRoleOrganization);
        }

        try {
			$organization = Organization::where('id', $id)->get();

			$tmp_list_logo = [];
			foreach ($organization as $key => $value) {
				$tmp_list_logo[] = Str::replaceFirst('storage/','public/', $value->logo);
			}
			unset($organization);

			Organization::where('id', $id)->delete();

			Storage::delete($tmp_list_logo);


			$person = Person::where('organization_id', $id)->get();

			$tmp_list_avatar_pic = [];
			foreach ($person as $key => $value) {
				$tmp_list_avatar_pic[] = Str::replaceFirst('storage/','public/', $value->avatar);
			}
			unset($person);

			Person::where('organization_id', $id)->delete();

			Storage::delete($tmp_list_avatar_pic);

            RoleOrganization::where('organization_id', $id)->delete();

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

    public function ubah_organisasi(Request $request) {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
            if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

            $id = $request->input('id');

            if ( Auth::user()->role == 'account_manager' ) {
                $checkRoleOrganization = RoleOrganization::where('user_id',Auth::user()->id)->where('organization_id',$id)->get();

                if ( count($checkRoleOrganization) == 0 ) return redirect('/organisasi');
                unset($checkRoleOrganization);
            }

            $organization = Organization::find($id);

            $person = Person::where('organization_id', $organization['id'])->get();

            $arrPic = [];
            foreach ($person as $k => $v) {
                $arrPic[] = (object) [
                    'id' => $v['id'],
                    'name' => $v['name'],
                    'email' => $v['email'],
                    'phone' => $v['phone'],
                    'avatar' => url('/'.$v['avatar'])
                ];
            }
            unset($person);

            $arr_organization = (object) [
                'id' => $organization['id'],
                'name' => $organization['name'],
                'email' => $organization['email'],
                'phone' => $organization['phone'],
                'website' => $organization['website'],
                'logo' => url('/'.$organization['logo']),
                'pic' => $arrPic
            ];

            unset($organization);

            $data = (object) $arr_organization;

            return response()->json([
                'success' => true,
                'message' => 'Lihat Data Berhasil!',
                'data' => $data
            ], 200);
        }
    }

    public function simpan_edit_organisasi(Request $request) {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
            if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

            $id = $request->input('id');

            if ( Auth::user()->role == 'account_manager' ) {
                $checkRoleOrganization = RoleOrganization::where('user_id',Auth::user()->id)->where('organization_id',$id)->get();

                if ( count($checkRoleOrganization) == 0 ) return redirect('/organisasi');
                unset($checkRoleOrganization);
            }

            $organization = Organization::find($id);

            $organization->name = $request->input('name');
            $organization->email = $request->input('email');
            $organization->phone = $request->input('phone');
            $organization->website = $request->input('website');

            if ( $request->hasFile('image') ) {
                Storage::delete(Str::replaceFirst('storage/','public/', $organization->logo));
                $filename = $this->storeImage($request->file('image'),'logo');
                $organization->logo = $filename;
            }

            try {
                $organization->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Ubah Data Berhasil!',
                    'response' => $organization,
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
