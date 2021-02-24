<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Printerous Challenge - Organization</title>
        <link href="{{ asset('css/styles.css') }}" rel="stylesheet" />
    </head>
    <body class="bg-primary">
        <div id="layoutAuthentication" class="register">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Register</h3></div>
                                    <div class="card-body">
                                        <form action="{{ route('register.store') }}">
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputNama">Nama</label>
                                                <input class="form-control py-4" id="inputName" type="text" placeholder="Masukan nama" />
                                            </div>
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputEmailAddress">Email</label>
                                                <input class="form-control py-4" id="inputEmailAddress" type="email" placeholder="Masukan alamat email" />
                                            </div>
                                            <div class="form-group">
                                                <label class="small mb-1" for="inputPassword">Password</label>
                                                <input class="form-control py-4" id="inputPassword" type="password" placeholder="Masukan password" />
                                            </div>
                                            <div class="form-group">
                                                <label class="small mb-1" for="selectRole">Role</label>
                                                <select class="form-control" for="selectRole" id="selectRole">
                                                    <option value="">--- Silahkan Pilih ---</option>
                                                    <option value="administrator">Administrator</option>
                                                    <option value="account_manager">Account Manager</option>
                                                    <option value="member">Member</option>
                                                </select>
                                            </div>
                                            <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="small" href="{{ route('login') }}">Kembali ke login</a>
                                                <a class="btn btn-primary btn-register" href="javascript:void(0)">Register</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <br>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Andrian Dwiari - Printerous Challenge - @php echo date("Y"); @endphp</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="{{ asset('js/jquery-3.5.1.min.js') }}"></script>
        <script src="{{ asset('js/all.min.js') }}"></script>
        <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
        <script src="{{ asset('js/main.js') }}"></script>
    </body>
</html>