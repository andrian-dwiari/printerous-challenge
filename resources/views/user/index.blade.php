@extends('default')

@section('content')
<main class="user">
    <div class="container-fluid">
        <h1 class="mt-4">user</h1>
        <hr>
        <a href="{{ route('tambah-user') }}"><button class="btn btn-primary">Tambah</button></a>
        <br>
        <br>
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable-user" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                	@foreach($user as $value)
                	<tr>
                        <td>{!! $value->name !!}</td>
                        <td>{!! $value->email !!}</td>
                        <td>{!! str_replace('_', ' ', $value->role) !!}</td>
                        <td>
                        	<button title="Lihat" class="btn btn-info btn-sm btn-lihat-user" data-id="{!! $value->id !!}" data-action="{{ route('user.lihat_user') }}"><i class="fas fa-eye"></i></button> &nbsp;
                        	<button title="Ubah" class="btn btn-warning btn-sm btn-ubah-user" data-id="{!! $value->id !!}" data-action="{{ route('user.ubah_user') }}"><i class="fas fa-edit"></i></button> &nbsp;
	                        <button title="Hapus" class="btn btn-danger btn-sm btn-hapus-user" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-trash"></i></button>
	                    </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modal_lihat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Lihat User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-user" action="{{ route('user.simpan_tambah_user') }}">
              <div class="form-group">
                <label for="NamaUser">Nama User</label>
                <input type="text" class="form-control" name="view_nama_user" id="view-nama-user" placeholder="Masukan Nama User" readonly="readonly">
              </div>
              <div class="form-group">
                <label for="EmailUser">Email User</label>
                <input type="text" class="form-control" name="view_email_user" id="view-email-user" placeholder="Masukan Email User" readonly="readonly">
              </div>
              <div class="form-group">
                <label for="selectRole">Role User</label>
                <input type="text" class="form-control" name="view_role_user" id="view-role-user" readonly="readonly">
              </div>
            </form>
            <br>
            <div class="form-group">
                <label for="EmailUser">List Akses Organisasi</label>
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable-list-akses-organisasi" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                </div>
            </div>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-batal" data-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ubah User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-edit-user" action="{{ route('user.simpan_edit_user') }}">
              <div class="form-group">
                <label for="NamaUser">Nama User</label>
                <input type="text" class="form-control" name="edit_nama_user" id="edit-nama-user" placeholder="Masukan Nama User">
              </div>
              <div class="form-group">
                <label for="EmailUser">Email User</label>
                <input type="text" class="form-control" name="edit_email_user" id="edit-email-user" placeholder="Masukan Email User">
              </div>
              <div class="form-group">
                <label for="passwordUser">Password User <font color="red"><i>*kosongkan jika tidak ingin mengubah password</i></font></label>
                <input type="text" class="form-control" name="edit_password_user" id="edit-password-user">
              </div>
              <div class="form-group">
                <label for="selectRole">Role User</label>
                <select class="form-control" for="RoleUser" name="edit_role_user" id="edit-role-user">
                </select>
              </div>
            </form>
            <br>
            <div class="form-group">
                <label for="listAkses">List Akses Organisasi</label>
                <br>
                <button class="btn btn-primary btn-sm btn-tambah-akses-organisasi"><i class="fas fa-plus"></i> Tambah Akses Organisasi</button>
                <br>
                <br>
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable-tambah-akses-organisasi" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                </div>
            </div>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-batal btn-kembali-user" data-dismiss="modal">Tutup</button>
            <button class="btn btn-info btn-simpan-edit-user">Simpan</button>
            <input type="hidden" id="redirect-success" value="{{ route('user') }}">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_hapus_user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Hapus User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Anda yakin akan menghapus user ini?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn-proses-hapus-user" data-action="{{ route('user.hapus_user') }}">Hapus</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <input type="hidden" name="id_user_tmp" id="id-user-tmp" value="">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tambah Akses Organisasi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-tambah-akses-user-organisasi">
              <div class="form-group">
                <label class="small mb-1" for="selectRole">Organisasi</label>
                <select class="form-control" for="AksesOrganisasi" name="tambah_akses_organisasi" id="tambah-akses-organisasi">
                  @foreach($organization as $value)
                  <option value="{!! $value->id !!}">{!! $value->name !!}</option>
                  @endforeach
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-batal" data-dismiss="modal">Batal</button>
            <input type="submit" class="btn btn-primary btn-proses-tambah-akses-organisasi" value="Simpan" data-action="{{ route('user.simpan_tambah_akses_user_organisasi') }}">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_hapus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Hapus Akses Organisasi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Anda yakin akan menghapus akses organisasi ini?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn-proses-hapus-akses-organisasi" data-action="{{ route('user.hapus_akes_user_organisasi') }}">Hapus</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          </div>
        </div>
      </div>
    </div>
</main>
@endsection