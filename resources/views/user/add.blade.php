@extends('default')

@section('content')
<main>
    <div class="container-fluid tambah-kategori-produk">
        <h1 class="mt-4">Tambah Kategori Produk</h1>
        <hr>
        <br>
        <form action="{{ route('kategori.simpan_tambah_kategori') }}">
          <div class="form-group">
            <label for="NamaKategori">Nama Kategori</label>
            <input type="text" class="form-control" id="nama-kategori" placeholder="Masukan Nama Kategori">
          </div>
        </form>
        <a href="{{ route('kategori') }}"><button class="btn btn-primary">Kembali</button></a>
        <button class="btn btn-info btn-simpan">Simpan</button>
        <input type="hidden" id="redirect-success" value="{{ route('kategori') }}">
    </div>
</main>
@endsection