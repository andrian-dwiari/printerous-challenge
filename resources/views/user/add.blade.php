@extends('default')

@section('content')
<main class="tambah-user">
    <div class="container-fluid">
        <h1 class="mt-4">Tambah user</h1>
        <hr>
        <br>
        <form id="form-user" action="{{ route('user.simpan_tambah_user') }}">
          <div class="form-group">
            <label for="NamaUser">Nama User</label>
            <input type="text" class="form-control" name="tambah_nama_user" id="tambah-nama-user" placeholder="Masukan Nama User">
          </div>
          <div class="form-group">
            <label for="EmailUser">Email User</label>
            <input type="text" class="form-control" name="tambah_email_user" id="tambah-email-user" placeholder="Masukan Email User">
          </div>
          <div class="form-group">
            <label for="PasswordUser">Password User</label>
            <input type="text" class="form-control" name="tambah_password_user" id="tambah-password-user" placeholder="Masukan Password User">
          </div>
          <div class="form-group">
            <label for="selectRole">Role User</label>
            <select class="form-control" for="RoleUser" name="tambah_role_user" id="tambah-role-user">
              <option value="administrator">Administrator</option>
              <option value="account_manager">Account Manager</option>
              <option value="member">Member</option>
            </select>
          </div>
        </form>

        <br>
        <div class="form-group">
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
        <input type="hidden" name="id_user_tmp" id="id-user-tmp" value="">
        <br>

        <br>
        <button class="btn btn-primary btn-kembali-user" data-action="{{ route('user.batal_tambah_user') }}">Kembali</button>
        <button class="btn btn-info btn-simpan-user">Simpan</button>
        <input type="hidden" id="redirect-success" value="{{ route('user') }}">
    </div>

    <div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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