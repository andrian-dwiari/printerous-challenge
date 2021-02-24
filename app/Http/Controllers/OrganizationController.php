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

class OrganizationController extends Controller
{
    public function index() {
        if ( Auth::guest() ) {
            return redirect('/');
        }
        else {
        	$data = DB::table('organization')->get();
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

					$filename = $this->storeImage($request->file('image'),'avatar','thumbnail');

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

    public function hapus_pic_organisasi(Request $request) {
    	if ( Auth::user()->role == 'member' ) return redirect('/organisasi');

        $id = $request->input('id');

        try {
			$person = Person::find($id);

			$tmp_filename = $person->avatar;
			
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

					$filename = $this->storeImage($request->file('image'),'avatar','thumbnail');
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

    public function storeImage($value,$attribute_name,$type_image) {
        $attribute_name = $attribute_name;
        // destination path relative to the disk above
        $destination_path = "public/images/avatar";

        // if the image was erased
        if ($value==null) {
            // delete the image from disk
            Storage::delete($this->{$attribute_name});

            // set null in the database column
            $this->attributes[$attribute_name] = null;
        }

        // 0. Make the image
        $image = Image::make($value)->fit(100)->encode('jpg', 90);

        // 1. Generate a filename.
        $filename = md5($value.time().$type_image).'.jpg';

        // 2. Store the image on disk.
        Storage::put($destination_path.'/'.$filename, $image->stream());

        // 3. Delete the previous image, if there was one.
        Storage::delete(Str::replaceFirst('storage/','public/', $attribute_name));

        // 4. Save the public path to the database
        // but first, remove "public/" from the path, since we're pointing to it
        // from the root folder; that way, what gets saved in the db
        // is the public URL (everything that comes after the domain name)
        $public_destination_path = Str::replaceFirst('public/', 'storage/', $destination_path);
        
        return $public_destination_path.'/'.$filename;
    }
}
