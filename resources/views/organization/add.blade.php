@extends('default')

@section('content')
<main class="tambah-organisasi">
    <div class="container-fluid">
        <h1 class="mt-4">Tambah organisasi</h1>
        <hr>
        <br>
        <form id="form-organisasi" action="{{ route('organisasi.simpan_tambah_organisasi') }}" enctype="multipart/form-data">
          <div class="form-group">
            <label for="NamaOrganisasi">Nama Organisasi</label>
            <input type="text" class="form-control" name="tambah_nama_organisasi" id="tambah-nama-organisasi" placeholder="Masukan Nama Organisasi">
          </div>
          <div class="form-group">
            <label for="NoTeleponOrganisasi">No Telepon Organisasi</label>
            <input type="text" class="form-control" name="tambah_no_telepon_organisasi" id="tambah-no-telepon-organisasi" placeholder="Masukan No Telepon Organisasi">
          </div>
          <div class="form-group">
            <label for="EmailOrganisasi">Email Organisasi</label>
            <input type="text" class="form-control" name="tambah_email_organisasi" id="tambah-email-organisasi" placeholder="Masukan Email Organisasi">
          </div>
          <div class="form-group">
            <label for="WebsiteOrganisasi">Website Organisasi</label>
            <input type="text" class="form-control" name="tambah_website_organisasi" id="tambah-website-organisasi" placeholder="Masukan Website Organisasi">
          </div>
          <div class="form-group">
            <label for="LogoOrganisasi">Logo Organisasi</label>
            <input type="file" class="form-control" name="tambah_logo_organisasi" id="tambah-logo-organisasi">
          </div>
        </form>

        <br>
        <div class="form-group">
            <button class="btn btn-primary btn-sm btn-tambah-pic"><i class="fas fa-plus"></i> Tambah PIC</button>
            <br>
            <br>
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable-tambah-pic" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>No Telepon</th>
                            <th>Avatar</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <input type="hidden" name="id_organisasi_tmp" id="id-organisasi-tmp" value="">
        <br>

        <br>
        <button class="btn btn-primary btn-kembali-organisasi" data-action="{{ route('organisasi.batal_tambah_organisasi') }}">Kembali</button>
        <button class="btn btn-info btn-simpan-organisasi">Simpan</button>
        <input type="hidden" id="redirect-success" value="{{ route('organisasi') }}">
    </div>

    <div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tambah PIC</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-tambah-pic-organisasi" action="{{ route('organisasi.simpan_tambah_pic_organisasi') }}" enctype="multipart/form-data">
              <div class="form-group">
                <label class="col-form-label">Nama:</label>
                <input type="text" class="form-control" name="tambah_pic_nama" id="tambah-pic-nama">
              </div>
              <div class="form-group">
                <label class="col-form-label">Email:</label>
                <input type="text" class="form-control" name="tambah_pic_email" id="tambah-pic-email">
              </div>
              <div class="form-group">
                <label class="col-form-label">No Telepon:</label>
                <input type="text" class="form-control" name="tambah_pic_no_telepon" id="tambah-pic-no-telepon">
              </div>
              <div class="form-group">
                <label class="col-form-label">Avatar:</label>
                <input type="file" class="form-control" name="tambah_pic_avatar" id="tambah-pic-avatar">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-batal" data-dismiss="modal">Batal</button>
            <input type="submit" class="btn btn-primary btn-proses-tambah-pic" value="Simpan">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ubah PIC</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-edit-pic-organisasi" enctype="multipart/form-data">
              <div class="form-group">
                <label class="col-form-label">Nama:</label>
                <input type="text" class="form-control" name="edit_pic_nama" id="edit-pic-nama">
              </div>
              <div class="form-group">
                <label class="col-form-label">Email:</label>
                <input type="text" class="form-control" name="edit_pic_email" id="edit-pic-email">
              </div>
              <div class="form-group">
                <label class="col-form-label">No Telepon:</label>
                <input type="text" class="form-control" name="edit_pic_no_telepon" id="edit-pic-no-telepon">
              </div>
              <div class="form-group">
                <label class="col-form-label">Avatar: <font color="red"><i>*kosongkan jika tidak ingin mengubah avatar</i></font></label>
                <input type="file" class="form-control" name="edit_pic_avatar" id="edit-pic-avatar">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-batal" data-dismiss="modal">Batal</button>
            <input type="submit" class="btn btn-primary btn-proses-edit-pic" value="Simpan" data-action="{{ route('organisasi.edit_pic_organisasi') }}">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_hapus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Hapus PIC</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Anda yakin akan menghapus pic ini?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn-proses-hapus-pic" data-action="{{ route('organisasi.hapus_pic_organisasi') }}">Hapus</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          </div>
        </div>
      </div>
    </div>
</main>
@endsection