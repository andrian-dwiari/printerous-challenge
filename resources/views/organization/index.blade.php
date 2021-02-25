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
                          	<button title="Ubah" class="btn btn-warning btn-sm btn-ubah-organisasi" data-id="{!! $value->id !!}"><i class="fas fa-edit"></i></button> &nbsp;
  	                        <button title="Hapus" class="btn btn-danger btn-sm btn-hapus-organisasi" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-trash"></i></button>
                          @elseif ( Auth::user()->role == 'account_manager' )
                            @if ( $value->access )
                              <button title="Ubah" class="btn btn-warning btn-sm btn-ubah-organisasi" data-id="{!! $value->id !!}"><i class="fas fa-edit"></i></button> &nbsp;
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

    <div class="modal fade" id="modal_hapus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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