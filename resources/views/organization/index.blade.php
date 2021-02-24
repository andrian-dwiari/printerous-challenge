@extends('default')

@section('content')
<main>
    <div class="container-fluid organisasi">
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
                        <th>No Telepon</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Logo</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                	@foreach($organization as $value)
                	<tr>
                        <td>{!! $value->name !!}</td>
                        <td>{!! $value->phone !!}</td>
                        <td>{!! $value->email !!}</td>
                        <td>{!! $value->website !!}</td>
                        <td>{!! $value->logo !!}</td>
                        <td>
                        	<button title="Lihat" class="btn btn-info btn-sm btn-lihat" data-id="{!! $value->id !!}"><i class="fas fa-eye"></i></button>
                        	<button title="Ubah" class="btn btn-warning btn-sm btn-ubah" data-id="{!! $value->id !!}"><i class="fas fa-edit"></i></button>
	                        <button title="Hapus" class="btn btn-danger btn-sm btn-hapus" data-id="{!! $value->id !!}"><i class="fas fa-trash"></i></button>
	                    </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</main>
@endsection