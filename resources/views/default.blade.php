<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Printerous Challenge</title>
        <link href="{{ asset('css/styles.css') }}" rel="stylesheet" />
        <link href="{{ asset('css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" />
        <style type="text/css">
            .modal {overflow-y:auto;}
            .hide {display: none}
        </style>
    </head>
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="{{ route('dashboard') }}">Printerous Challenge</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <a class="nav-link" href="{{ route('dashboard') }}">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            @if ( Auth::user()->role == 'administrator' )
                            <a class="nav-link" href="{{ route('user') }}">
                                <div class="sb-nav-link-icon"><i class="fas fa-user"></i></div>
                                User
                            </a>
                            @endif
                            <a class="nav-link" href="{{ route('organisasi') }}">
                                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                Organisasi
                            </a>
                            <a class="nav-link" href="{!! URL::to('/logout') !!}">
                                <div class="sb-nav-link-icon"><i class="fas fa-undo"></i></div>
                                Keluar
                            </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        {{ $username }}
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                @yield('content')
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
        <script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>
        <script src="{{ asset('js/all.min.js') }}"></script>
        <script src="{{ asset('js/scripts.js') }}"></script>
        <script src="{{ asset('js/jquery.dataTables.min.js') }}"></script>
        <script src="{{ asset('js/dataTables.bootstrap4.min.js') }}"></script>
        <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
        <script src="{{ asset('js/jquery.cookie.js') }}"></script>
        <script src="{{ asset('js/main.js') }}"></script>
    </body>
</html>
