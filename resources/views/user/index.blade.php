@extends('default')

@section('content')
<main>
    <div class="container-fluid kategori-produk">
        <h1 class="mt-4">Kategori Produk</h1>
        <hr>
        <a href="{{ route('tambah-kategori') }}"><button class="btn btn-primary">Tambah</button></a>
        <br>
        <br>
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable-kategori" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                	@foreach($kategori as $value)
                	<tr>
                        <td>{!! $value->name !!}</td>
                        <td>
                        	<button title="Lihat" class="btn btn-info btn-sm btn-lihat" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-eye"></i></button>
                        	<button title="Ubah" class="btn btn-warning btn-sm btn-ubah" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-edit"></i></button>
	                        <button title="Hapus" class="btn btn-danger btn-sm btn-hapus" data-id="{!! $value->id !!}" data-name="{!! $value->name !!}"><i class="fas fa-trash"></i></button>
	                    </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modal_edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">Ubah Kategori</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-name" class="col-form-label">Nama Kategori:</label>
	            <input type="text" class="form-control" id="nama-kategori">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
	        <button type="button" class="btn btn-primary btn-proses-ubah" data-action="{{ route('kategori.ubah_kategori') }}">Simpan</button>
	      </div>
	    </div>
	  </div>
	</div>

	<div class="modal fade" id="modal_lihat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title">Lihat Kategori</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="recipient-name" class="col-form-label">Nama Kategori:</label>
	            <input type="text" class="form-control" id="lihat-nama-kategori" disabled="disabled">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
	      </div>
	    </div>
	  </div>
	</div>

	<div class="modal fade" id="modal_hapus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title">Hapus Kategori</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <p>Anda yakin akan menghapus kategori ini?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-danger btn-proses-hapus" data-action="{{ route('kategori.hapus_kategori') }}">Hapus</button>
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
	      </div>
	    </div>
	  </div>
	</div>
</main>
@endsection