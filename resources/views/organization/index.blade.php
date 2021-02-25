@extends('default')

@section('content')
<main class="organisasi">
    <div class="container-fluid">
        <h1 class="mt-4">organisasi</h1>
        <hr>
        <a href="{{ route('tambah-organisasi') }}"><button class="btn btn-primary">Tambah</button></a>
        <br>
        <br>
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable-organisasi" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>PIC</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                	@foreach($organization as $value)
                	<tr>
                        <td>{!! $value->name !!}</td>
                        <td>{!! $value->pic !!}</td>
                        <td>
                        	<button title="Lihat" class="btn btn-info btn-sm btn-lihat-organisasi" data-id="{!! $value->id !!}" data-action="{{ route('organisasi.lihat_organisasi') }}"><i class="fas fa-eye"></i></button> &nbsp;
                          @if ( Auth::user()->role == 'administrator' )
                          	<button title="Ubah" class="btn btn-warning btn-sm btn-ubah-organisasi" data-id="{!! $value->id !!}" data-action="{{ route('organisasi.ubah_organisasi') }}"><i class="fas fa-edit"></i></button> &nbsp;
  	                        <button title="Hapus" class="btn btn-danger btn-sm btn-hapus-organisasi" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-trash"></i></button>
                          @elseif ( Auth::user()->role == 'account_manager' )
                            @if ( $value->access )
                              <button title="Ubah" class="btn btn-warning btn-sm btn-ubah-organisasi" data-id="{!! $value->id !!}" data-action="{{ route('organisasi.ubah_organisasi') }}"><i class="fas fa-edit"></i></button> &nbsp;
                              <button title="Hapus" class="btn btn-danger btn-sm btn-hapus-organisasi" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-trash"></i></button>
                            @endif
                          @endif
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
            <h5 class="modal-title" id="exampleModalLabel">Lihat Organisasi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-organisasi">
              <div class="form-group">
                <label for="NamaOrganisasi">Nama Organisasi</label>
                <input type="text" class="form-control" name="view_organisasi_nama" id="view-organisasi-nama" placeholder="Masukan Nama Organisasi" readonly="readonly">
              </div>
              <div class="form-group">
                <label for="NoTeleponOrganisasi">No Telepon Organisasi</label>
                <input type="text" class="form-control" name="view_organisasi_no_telepon" id="view-organisasi-no-telepon" placeholder="Masukan No Telepon Organisasi" readonly="readonly">
              </div>
              <div class="form-group">
                <label for="EmailOrganisasi">Email Organisasi</label>
                <input type="text" class="form-control" name="view_organisasi_email" id="view-organisasi-email" placeholder="Masukan Email Organisasi" readonly="readonly">
              </div>
              <div class="form-group">
                <label for="WebsiteOrganisasi">Website Organisasi</label>
                <input type="text" class="form-control" name="view_organisasi_website" id="view-organisasi-website" placeholder="Masukan Website Organisasi" readonly="readonly">
              </div>
              <div class="form-group">
                <label for="LogoOrganisasi">Logo Organisasi</label>
                <br>
                <img src="" id="view-organisasi-logo">
              </div>
            </form>
            <br>
            <div class="form-group">
                <label>List PIC</label>
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable-list-pic" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>No Telepon</th>
                                <th>Avatar</th>
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

    <div class="modal fade" id="modal_edit_organisasi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ubah Organisasi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-edit-organisasi" action="{{ route('organisasi.simpan_edit_organisasi') }}" enctype="multipart/form-data">
              <div class="form-group">
                <label for="NamaOrganisasi">Nama Organisasi</label>
                <input type="text" class="form-control" name="edit_nama_organisasi" id="edit-nama-organisasi" placeholder="Masukan Nama Organisasi">
              </div>
              <div class="form-group">
                <label for="NoTeleponOrganisasi">No Telepon Organisasi</label>
                <input type="text" class="form-control" name="edit_no_telepon_organisasi" id="edit-no-telepon-organisasi" placeholder="Masukan No Telepon Organisasi">
              </div>
              <div class="form-group">
                <label for="EmailOrganisasi">Email Organisasi</label>
                <input type="text" class="form-control" name="edit_email_organisasi" id="edit-email-organisasi" placeholder="Masukan Email Organisasi">
              </div>
              <div class="form-group">
                <label for="WebsiteOrganisasi">Website Organisasi</label>
                <input type="text" class="form-control" name="edit_website_organisasi" id="edit-website-organisasi" placeholder="Masukan Website Organisasi">
              </div>
              <div class="form-group">
                <label for="LogoOrganisasi">Logo Organisasi <font color="red"><i>*kosongkan jika tidak ingin mengubah logo</i></font></label>
                <input type="file" class="form-control" name="edit_logo_organisasi" id="edit-logo-organisasi">
              </div>
            </form>
            <br>
            <div class="form-group">
                <label>List PIC</label>
                <br>
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
            <br>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-batal btn-kembali-organisasi" data-dismiss="modal">Tutup</button>
            <button class="btn btn-info btn-simpan-edit-organisasi">Simpan</button>
            <input type="hidden" id="redirect-success" value="{{ route('organisasi') }}">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <input type="hidden" name="id_organisasi_tmp" id="id-organisasi-tmp" value="">
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

    <div class="modal fade" id="modal_hapus_organisasi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Hapus Organisasi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Anda yakin akan menghapus organisasi ini?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn-proses-hapus-organisasi" data-action="{{ route('organisasi.hapus_organisasi') }}">Hapus</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          </div>
        </div>
      </div>
    </div>
</main>
@endsection