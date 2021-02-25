jQuery(document).ready(function() {
	if ( jQuery(".register").length > 0 ) {
		jQuery(".btn-register").click( function() {

            var nama_lengkap = jQuery("#inputName").val();
            var email    = jQuery("#inputEmailAddress").val();
            var password = jQuery("#inputPassword").val();
            var role = jQuery("#selectRole").val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            if (nama_lengkap.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Nama Wajib Diisi !'
                });

            } else if(email.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Alamat Email Wajib Diisi !'
                });

            } else if(!validateEmail(email)) {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Format Email Salah !'
                });

            } else if(password.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Password Wajib Diisi !'
                });

            } else if(role == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Role Wajib Diisi !'
                });

            } else {

                //ajax
                jQuery.ajax({

                    url: jQuery(".register form").attr('action'),
                    type: "POST",
                    cache: false,
                    data: {
                        "nama_lengkap": nama_lengkap,
                        "email": email,
                        "password": password,
                        "role": role,
                        "_token": token
                    },

                    success:function(response){

                        if (response.success) {

                            Swal.fire({
                                type: 'success',
                                title: 'Register Berhasil!',
                                text: 'silahkan login!'
                            });

                            jQuery("#inputName").val('');
                            jQuery("#inputEmailAddress").val('');
                            jQuery("#inputPassword").val('');
                            jQuery("#selectRole").val('');

                        } else {

                            Swal.fire({
                                type: 'error',
                                title: 'Register Gagal!',
                                text: 'silahkan coba lagi!'
                            });

                        }

                    },

                    error:function(response){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });
                    }

                })

            }

        });
	}

	if ( jQuery(".login").length > 0 ) {
		jQuery(".btn-login").click( function() {
            var email = jQuery("#inputEmailAddress").val();
            var password = jQuery("#inputPassword").val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            var validasi = validasi_login(email,password,token);

            if ( validasi ) {
                login_process(email,password,token);
            }
        });

        jQuery('#inputEmailAddress, #inputPassword').on('keypress',function(e) {
            var email = jQuery("#inputEmailAddress").val();
            var password = jQuery("#inputPassword").val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            if(e.which == 13) {
                var validasi = validasi_login(email,password,token);

                if ( validasi ) {
                    login_process(email,password,token);
                }
            }
        });

        function validasi_login(email,password,token) {
            if(email.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Alamat Email Wajib Diisi !'
                });

                return false;

            } else if(!validateEmail(email)) {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Format Email Salah !'
                });

                return false;

            } else if(password.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Password Wajib Diisi !'
                });

                return false;

            }

            return true;
        }

        function login_process(email,password,token) {
            jQuery.ajax({
                url: jQuery(".login form").attr('action'),
                type: "POST",
                dataType: "JSON",
                cache: false,
                data: {
                    "email": email,
                    "password": password,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Login Berhasil!',
                            text: 'Anda akan di arahkan ke halaman dashboard',
                            timer: 3000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                            .then (function() {
                                window.location.href = jQuery("#redirect-login-success").val();
                            });

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Login Gagal!',
                            text: 'silahkan coba lagi!'
                        });

                    }

                },
                error:function(response){

                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });

                }
            });
        }
	}

	if ( jQuery(".organisasi").length > 0 ) {
		jQuery('#dataTable-organisasi').DataTable();

        function reset_modal_form_view_organization() {
            jQuery('#view-organisasi-nama').val('');
            jQuery('#view-organisasi-email').val('');
            jQuery('#view-organisasi-no-telepon').val('');
            jQuery('#view-organisasi-website').val('');
            jQuery('#view-organisasi-logo').attr('src','');

            jQuery('#dataTable-list-pic tbody').find('tr').remove();
        }

        function reset_modal_form_edit_organization() {
            jQuery('#edit-organisasi-nama').val('');
            jQuery('#edit-organisasi-email').val('');
            jQuery('#edit-organisasi-no-telepon').val('');
            jQuery('#edit-organisasi-website').val('');
            jQuery('#edit-organisasi-logo').val('');

            jQuery('#dataTable-list-pic tbody').find('tr').remove();

            jQuery('#modal_edit .modal-footer .btn-proses-edit-organisasi').prop('disabled',false);
            jQuery('#modal_edit .modal-footer .btn-batal').prop('disabled',false);
        }

        jQuery(".modal-content .modal-header button.close, .modal-content .modal-footer button.btn-batal").click( function() {
            reset_modal_form_view_organization();
            reset_modal_form_edit_organization();
        });

        jQuery(".btn-lihat-organisasi").click( function() {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){
                    jQuery('#modal_lihat').find('#view-organisasi-nama').val(response.data.name);
                    jQuery('#modal_lihat').find('#view-organisasi-email').val(response.data.email);
                    jQuery('#modal_lihat').find('#view-organisasi-no-telepon').val(response.data.phone);
                    jQuery('#modal_lihat').find('#view-organisasi-website').val(response.data.website);
                    jQuery('#modal_lihat').find('#view-organisasi-logo').attr('src',response.data.logo);
                    jQuery('#modal_lihat').find('#view-organisasi-logo').attr('alt',response.data.name);
                    jQuery('#modal_lihat').find('#view-organisasi-logo').attr('title',response.data.name);

                    jQuery.each(response.data.pic,function(index,value){
                        var setTr = '';
                        setTr = ''+
                        '<tr class="tr-'+value.id+'">'+
                            '<td class="td-name">'+value.name+'</td>'+
                            '<td class="td-email">'+value.email+'</td>'+
                            '<td class="td-phone">'+value.phone+'</td>'+
                            '<td class="td-avatar"><img src='+value.avatar+' alt='+value.name+' title='+value.name+' width="75px" height="75px"></td>'+
                        '</tr>';

                        jQuery('table#dataTable-list-pic tbody').append(setTr);
                    });

                    jQuery('#modal_lihat').modal('show');
                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            });
        });

        jQuery(document).on("click", ".btn-hapus-organisasi", function (event) {
            var id = jQuery(this).data('id');
            var name = jQuery(this).data('name');
            jQuery('#modal_hapus_organisasi').find('.modal-body p').text('Anda yakin akan menghapus organisasi '+name+'?');
            jQuery('#modal_hapus_organisasi').find('.btn-proses-hapus-organisasi').data('id',id);
            jQuery('#modal_hapus_organisasi').modal('show');
        });

        jQuery(".btn-proses-hapus-organisasi").click( function() {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: response.message,
                            showCancelButton: false,
                            showConfirmButton: true
                        })
                            .then (function() {
                                location.reload();
                            });

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: response.message
                        });

                    }

                    jQuery('#modal_hapus_organisasi').modal('hide');

                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });

        jQuery(document).on("click", ".btn-ubah-organisasi", function (event) {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            jQuery('.btn-simpan-edit-organisasi').data('id',id);

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        jQuery('#id-organisasi-tmp').val(response.data.id);

                        jQuery('#modal_edit_organisasi').find('#edit-nama-organisasi').val(response.data.name);
                        jQuery('#modal_edit_organisasi').find('#edit-no-telepon-organisasi').val(response.data.phone);
                        jQuery('#modal_edit_organisasi').find('#edit-email-organisasi').val(response.data.email);
                        jQuery('#modal_edit_organisasi').find('#edit-website-organisasi').val(response.data.website);

                        jQuery('table#dataTable-tambah-pic tbody tr').remove();

                        jQuery.each(response.data.pic,function(index,value){
                            var setTr = '';
                            setTr = ''+
                            '<tr class="tr-'+value.id+'">'+
                                '<td class="td-name">'+value.name+'</td>'+
                                '<td class="td-email">'+value.email+'</td>'+
                                '<td class="td-phone">'+value.phone+'</td>'+
                                '<td class="td-avatar"><img src='+value.avatar+' alt='+value.name+' title='+value.name+' width="75px" height="75px"></td>'+
                                '<td class="td-btn">'+
                                '<button title="Ubah" class="btn btn-warning btn-sm btn-edit-pic" data-id="'+value.id+'" data-name="'+value.name+'" data-email="'+value.email+'" data-phone="'+value.phone+'"><i class="fas fa-edit"></i></button>'+
                                ' <button title="Hapus" class="btn btn-danger btn-sm btn-hapus-pic" data-id="'+value.id+'" data-name="'+value.name+'"><i class="fas fa-trash"></i></button>'+
                                '</td>'+
                            '</tr>';

                            jQuery('table#dataTable-tambah-pic tbody').append(setTr);
                        });

                        jQuery('#modal_edit_organisasi').modal('show');

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: response.message
                        });

                    }
                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            });
        });

        jQuery('.btn-simpan-edit-organisasi').click( function() {
            var validasi = validasi_organisasi('edit');

            if ( validasi ) {
                jQuery.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                    }
                });

                jQuery('#modal_edit_organisasi .btn-simpan-edit-organisasi').prop('disabled',true);
                jQuery('#modal_edit_organisasi .btn-kembali-organisasi').prop('disabled',true);

                var form_data = new FormData();

                var blob = jQuery('#edit-logo-organisasi')[0].files[0];

                form_data.append('id', jQuery(this).data('id'));
                form_data.append('name', jQuery('#edit-nama-organisasi').val());
                form_data.append('email', jQuery('#edit-email-organisasi').val());
                form_data.append('phone', jQuery('#edit-no-telepon-organisasi').val());
                form_data.append('website', jQuery('#edit-website-organisasi').val());
                form_data.append('image', blob);

                jQuery.ajax({
                    type: 'POST',
                    url: jQuery('#modal_edit_organisasi #form-edit-organisasi').attr('action'),
                    dataType: 'json',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        if ( data.success ) {
                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: data.message,
                                showCancelButton: false,
                                showConfirmButton: true
                            })
                                .then (function() {
                                    location.reload();
                                });
                        }
                        else {
                            Swal.fire({
                                type: 'warning',
                                title: 'Oops...',
                                text: data.message
                            });

                            jQuery('#modal_edit_organisasi .btn-simpan-edit-organisasi').prop('disabled',false);
                            jQuery('#modal_edit_organisasi .btn-kembali-organisasi').prop('disabled',false);
                        }
                    },
                    error: function(data){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });

                        jQuery('#modal_edit_organisasi .btn-simpan-edit-organisasi').prop('disabled',false);
                        jQuery('#modal_edit_organisasi .btn-kembali-organisasi').prop('disabled',false);
                    },
                },'json');
            }
        });

        detail_pic_organisasi();
	}

	if ( jQuery(".tambah-organisasi").length > 0 ) {
        jQuery(".btn-kembali-organisasi").click( function() {
            var organisasi_id_tmp = jQuery('#id-organisasi-tmp').val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": organisasi_id_tmp,
                    "_token": token
                },
                success:function(response){
                    window.location.href = jQuery('#redirect-success').val();
                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });

        jQuery('.btn-simpan-organisasi').click( function() {
            var validasi = validasi_organisasi('tambah');

            if ( validasi ) {
                jQuery.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                    }
                });

                jQuery(this).prop('disabled',true);
                jQuery('.btn-kembali-organisasi').prop('disabled',true);

                var form_data = new FormData();

                var blob = jQuery('#tambah-logo-organisasi')[0].files[0];

                form_data.append('organisasi_id_tmp', jQuery('#id-organisasi-tmp').val());
                form_data.append('name', jQuery('#tambah-nama-organisasi').val());
                form_data.append('phone', jQuery('#tambah-no-telepon-organisasi').val());
                form_data.append('email', jQuery('#tambah-email-organisasi').val());
                form_data.append('website', jQuery('#tambah-website-organisasi').val());
                form_data.append('image', blob);

                jQuery.ajax({
                    type: 'POST',
                    url: jQuery('#form-organisasi').attr('action'),
                    dataType: 'json',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: data.message,
                            showCancelButton: false,
                            showConfirmButton: true
                        })
                            .then (function() {
                                window.location.href = jQuery('#redirect-success').val();
                            });
                    },
                    error: function(data){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });

                        jQuery('.btn-simpan-organisasi').prop('disabled',false);
                        jQuery('.btn-kembali-organisasi').prop('disabled',false);
                    },
                },'json');
            }
        });

		detail_pic_organisasi();
	}

    function validasi_organisasi(action) {
        var nama_organisasi = jQuery("#"+action+"-nama-organisasi").val();
        var notelp_organisasi = jQuery("#"+action+"-no-telepon-organisasi").val();
        var email_organisasi = jQuery("#"+action+"-email-organisasi").val();
        var website_organisasi = jQuery("#"+action+"-website-organisasi").val();
        var logo_organisasi = jQuery("#"+action+"-logo-organisasi").val();

        if (nama_organisasi.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Nama Organisasi Wajib Diisi !'
            });

            return false;

        } else if(notelp_organisasi.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'No Telepon Organisasi Wajib Diisi !'
            });

            return false;

        } else if(email_organisasi.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Email Organisasi Wajib Diisi !'
            });

            return false;

        } else if(!validateEmail(email_organisasi)) {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Format Email Organisasi Salah !'
            });

            return false;

        } else if(website_organisasi.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Website Organisasi Wajib Diisi !'
            });

            return false;

        }

        if ( action == 'tambah' ) {
            if(logo_organisasi.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Logo Organisasi Wajib Diisi !'
                });

                return false;

            }
        }

        if ( jQuery('#dataTable-tambah-pic tbody').find('tr').length < 1 ) {
            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'PIC Organisasi Wajib Diisi !'
            });

            return false;
        }

        return true;
    }

    function detail_pic_organisasi() {
        function reset_modal_form_add_pic() {
            jQuery('#tambah-pic-nama').val('');
            jQuery('#tambah-pic-email').val('');
            jQuery('#tambah-pic-no-telepon').val('');
            jQuery('#tambah-pic-avatar').val('');

            jQuery('#modal_add .modal-footer .btn-proses-tambah-pic').prop('disabled',false);
            jQuery('#modal_add .modal-footer .btn-batal').prop('disabled',false);
        }

        function reset_modal_form_edit_pic() {
            jQuery('#edit-pic-nama').val('');
            jQuery('#edit-pic-email').val('');
            jQuery('#edit-pic-no-telepon').val('');
            jQuery('#edit-pic-avatar').val('');

            jQuery('#modal_edit .modal-footer .btn-proses-edit-pic').prop('disabled',false);
            jQuery('#modal_edit .modal-footer .btn-batal').prop('disabled',false);
        }

        jQuery(".modal-content .modal-header button.close, .modal-content .modal-footer button.btn-batal").click( function() {
            reset_modal_form_add_pic();
            reset_modal_form_edit_pic();
        });

        jQuery(".btn-tambah-pic").click( function() {
            jQuery('#modal_add').modal('show');
        });

        function validasi_pic(action) {
            var nama_pic = jQuery("#"+action+"-pic-nama").val();
            var email_pic = jQuery("#"+action+"-pic-email").val();
            var notelp_pic = jQuery("#"+action+"-pic-no-telepon").val();
            var avatar_pic = jQuery("#"+action+"-pic-avatar").val();

            if (nama_pic.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Nama PIC Wajib Diisi !'
                });

                return false;

            } else if(email_pic.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Email PIC Wajib Diisi !'
                });

                return false;

            } else if(!validateEmail(email_pic)) {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Format Email PIC Salah !'
                });

                return false;

            } else if(notelp_pic.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'No Telepon PIC Wajib Diisi !'
                });

                return false;

            } 

            if ( action == 'tambah' ) {
                if(avatar_pic.length == "") {

                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...',
                        text: 'Avatar Wajib Diisi !'
                    });

                    return false;

                }
            }

            return true;
        }

        jQuery('#modal_add .btn-proses-tambah-pic').click( function() {
            var validasi = validasi_pic('tambah');

            if ( validasi ) {
                jQuery.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                    }
                });

                jQuery(this).prop('disabled',true);
                jQuery('#modal_add .modal-footer .btn-batal').prop('disabled',true);

                var form_data = new FormData();

                var blob = jQuery('#tambah-pic-avatar')[0].files[0];

                form_data.append('organisasi_id_tmp', jQuery('#id-organisasi-tmp').val());
                form_data.append('name', jQuery('#tambah-pic-nama').val());
                form_data.append('email', jQuery('#tambah-pic-email').val());
                form_data.append('phone', jQuery('#tambah-pic-no-telepon').val());
                form_data.append('image', blob);

                jQuery.ajax({
                    type: 'POST',
                    url: jQuery('#form-tambah-pic-organisasi').attr('action'),
                    dataType: 'json',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: data.message
                        });

                        jQuery('#id-organisasi-tmp').val(data.response.organization_id);

                        var setTr = '';
                        setTr = ''+
                        '<tr class="tr-'+data.response.id+'">'+
                            '<td class="td-name">'+data.response.name+'</td>'+
                            '<td class="td-email">'+data.response.email+'</td>'+
                            '<td class="td-phone">'+data.response.phone+'</td>'+
                            '<td class="td-avatar"><img src='+data.public_url+' alt='+data.response.name+' title='+data.response.name+' width="75px" height="75px"></td>'+
                            '<td class="td-btn">'+
                            '<button title="Ubah" class="btn btn-warning btn-sm btn-edit-pic" data-id="'+data.response.id+'" data-name="'+data.response.name+'" data-email="'+data.response.email+'" data-phone="'+data.response.phone+'"><i class="fas fa-edit"></i></button>'+
                            ' <button title="Hapus" class="btn btn-danger btn-sm btn-hapus-pic" data-id="'+data.response.id+'" data-name="'+data.response.name+'"><i class="fas fa-trash"></i></button>'+
                            '</td>'+
                        '</tr>';

                        var tmp_str = jQuery.parseHTML(setTr);

                        jQuery.each(tmp_str,function(index,value){
                            jQuery('table#dataTable-tambah-pic tbody').append(value);
                        });

                        reset_modal_form_add_pic();

                        jQuery('#modal_add').modal('hide');
                    },
                    error: function(data){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });

                        jQuery('#modal_add .modal-footer .btn-proses-tambah-pic').prop('disabled',false);
                        jQuery('#modal_add .modal-footer .btn-batal').prop('disabled',false);
                    },
                },'json');
            }
        });

        jQuery(document).on("click", ".btn-edit-pic", function (event) {
            var id = jQuery(this).data('id');
            var name = jQuery(this).data('name');
            jQuery('#modal_edit').find('#edit-pic-nama').val(jQuery(this).data('name'));
            jQuery('#modal_edit').find('#edit-pic-email').val(jQuery(this).data('email'));
            jQuery('#modal_edit').find('#edit-pic-no-telepon').val(jQuery(this).data('phone'));
            jQuery('#modal_edit').find('.btn-proses-edit-pic').data('id',id);
            jQuery('#modal_edit').modal('show');
        });

        jQuery(".btn-proses-edit-pic").click( function() {
            var id = jQuery(this).data('id');

            var validasi = validasi_pic('edit');

            if ( validasi ) {
                jQuery(this).prop('disabled',true);
                jQuery('#modal_edit .modal-footer .btn-batal').prop('disabled',true);

                var form_data = new FormData();

                var blob = jQuery('#edit-pic-avatar')[0].files[0];

                form_data.append('id', id);
                form_data.append('name', jQuery('#edit-pic-nama').val());
                form_data.append('email', jQuery('#edit-pic-email').val());
                form_data.append('phone', jQuery('#edit-pic-no-telepon').val());
                form_data.append('image', blob);

                //ajax
                jQuery.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                    }
                });

                jQuery.ajax({
                    url: jQuery(this).data('action'),
                    type: "POST",
                    dataType: 'json',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success:function(data){

                        if (data.success) {

                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: data.message
                            });

                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-name').text(data.response.name);
                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-email').text(data.response.email);
                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-phone').text(data.response.phone);

                            if ( data.ubah_avatar ) {
                                jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-avatar img').attr('src',data.public_url);
                                jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-avatar img').attr('alt',data.response.name);
                                jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-avatar img').attr('title',data.response.name);
                            }

                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-btn .btn-edit-pic').data('name',data.response.name);
                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-btn .btn-edit-pic').data('email',data.response.email);
                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-btn .btn-edit-pic').data('phone',data.response.phone);

                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('.td-btn .btn-hapus-pic').data('name',data.response.name);

                            reset_modal_form_edit_pic();

                        } else {

                            Swal.fire({
                                type: 'error',
                                title: 'Gagal!',
                                text: data.message
                            });

                        }

                        jQuery('#modal_edit').modal('hide');

                    },

                    error:function(data){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });
                    }
                })
            }
        });

        jQuery(document).on("click", ".btn-hapus-pic", function (event) {
            var id = jQuery(this).data('id');
            var name = jQuery(this).data('name');
            jQuery('#modal_hapus').find('.modal-body p').text('Anda yakin akan menghapus pic '+name+'?');
            jQuery('#modal_hapus').find('.btn-proses-hapus-pic').data('id',id);
            jQuery('#modal_hapus').modal('show');
        });

        jQuery(".btn-proses-hapus-pic").click( function() {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: response.message
                        });

                        jQuery('table#dataTable-tambah-pic tbody').find('tr.tr-'+id).remove();

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: response.message
                        });

                    }

                    jQuery('#modal_hapus').modal('hide');

                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });
    }

    if ( jQuery(".user").length > 0 ) {
        jQuery('#dataTable-user').DataTable();

        function reset_modal_form_view_user() {
            jQuery('#view-nama-user').val('');
            jQuery('#view-email-user').val('');
            jQuery('#view-role-user').val('');

            jQuery('#dataTable-list-akses-organisasi tbody').find('tr').remove();
        }

        function reset_modal_form_edit_user() {
            jQuery('#edit-nama-user').val('');
            jQuery('#edit-email-user').val('');
            jQuery('#edit-password-user').val('');
            jQuery('#edit-role-user').val('');

            jQuery('#dataTable-list-akses-organisasi tbody').find('tr').remove();

            jQuery('#modal_edit .modal-footer .btn-proses-edit-user').prop('disabled',false);
            jQuery('#modal_edit .modal-footer .btn-batal').prop('disabled',false);
        }

        jQuery(".modal-content .modal-header button.close, .modal-content .modal-footer button.btn-batal").click( function() {
            reset_modal_form_view_user();
            reset_modal_form_edit_user();
        });

        jQuery(".btn-lihat-user").click( function() {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){
                    jQuery('#modal_lihat').find('#view-nama-user').val(response.data.name);
                    jQuery('#modal_lihat').find('#view-email-user').val(response.data.email);
                    jQuery('#modal_lihat').find('#view-role-user').val(response.data.role);

                    if ( response.data.role == 'account manager' ) {
                        jQuery.each(response.data.akses,function(index,value){
                            var setTr = '';
                            setTr = ''+
                            '<tr class="tr-'+value.id+'">'+
                                '<td class="td-name">'+value.name+'</td>'+
                                '<td class="td-email">'+value.email+'</td>'+
                            '</tr>';

                            jQuery('table#dataTable-list-akses-organisasi tbody').append(setTr);
                        });
                    }
                    else if ( response.data.role == 'administrator' ) {
                        var setTr = '';
                        setTr = ''+
                        '<tr class="tr-'+response.data.role+'">'+
                            '<td colspan="2" align="center">Semua Akses</td>'+
                        '</tr>';

                        jQuery('table#dataTable-list-akses-organisasi tbody').append(setTr);
                    }
                    else if ( response.data.role == 'member' ) {
                        var setTr = '';
                        setTr = ''+
                        '<tr class="tr-'+response.data.role+'">'+
                            '<td colspan="2" align="center">Hanya bisa view organisasi</td>'+
                        '</tr>';

                        jQuery('table#dataTable-list-akses-organisasi tbody').append(setTr);
                    }

                    jQuery('#modal_lihat').modal('show');
                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            });
        });

        jQuery(document).on("click", ".btn-hapus-user", function (event) {
            var id = jQuery(this).data('id');
            var name = jQuery(this).data('name');
            jQuery('#modal_hapus_user').find('.modal-body p').text('Anda yakin akan menghapus user '+name+'?');
            jQuery('#modal_hapus_user').find('.btn-proses-hapus-user').data('id',id);
            jQuery('#modal_hapus_user').modal('show');
        });

        jQuery(".btn-proses-hapus-user").click( function() {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: response.message,
                            showCancelButton: false,
                            showConfirmButton: true
                        })
                            .then (function() {
                                location.reload();
                            });

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: response.message
                        });

                    }

                    jQuery('#modal_hapus_user').modal('hide');

                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });

        jQuery(document).on("click", ".btn-ubah-user", function (event) {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            jQuery('.btn-simpan-edit-user').data('id',id);

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        jQuery('#id-user-tmp').val(response.data.id);

                        jQuery('#modal_edit').find('#edit-nama-user').val(response.data.name);
                        jQuery('#modal_edit').find('#edit-email-user').val(response.data.email);

                        jQuery('#edit-role-user').find('option').remove();

                        var selectedOpt = '<option value="'+response.data.role+'">'+response.data.role_name+'</option>';
                        jQuery('#edit-role-user').append(selectedOpt);
                        
                        jQuery.each(response.data.list_role,function(index,value){
                            if ( value.id != response.data.role ) {
                                var setOpt = '<option value="'+value.id+'">'+value.name+'</option>';
                                jQuery('#edit-role-user').append(setOpt);
                            }
                        });


                        jQuery('table#dataTable-tambah-akses-organisasi tbody tr').remove();

                        if ( response.data.role == 'account_manager' ) {
                            jQuery.each(response.data.akses,function(index,value){
                                var setTr = '';
                                setTr = ''+
                                '<tr class="tr-'+value.id+'">'+
                                    '<td class="td-name">'+value.name+'</td>'+
                                    '<td class="td-email">'+value.email+'</td>'+
                                    '<td class="td-btn">'+
                                    '<button title="Hapus" class="btn btn-danger btn-sm btn-hapus-akses-user-organisasi" data-id="'+value.id+'" data-name="'+value.name+'"><i class="fas fa-trash"></i></button>'+
                                    '</td>'+
                                '</tr>';

                                jQuery('table#dataTable-tambah-akses-organisasi tbody').append(setTr);
                            });
                        }
                        else if ( response.data.role == 'administrator' ) {
                            var setTr = '';
                            setTr = ''+
                            '<tr class="tr-'+response.data.role+'">'+
                                '<td colspan="2" align="center">Semua Akses</td>'+
                            '</tr>';

                            jQuery('table#dataTable-tambah-akses-organisasi tbody').append(setTr);
                        }
                        else if ( response.data.role == 'member' ) {
                            var setTr = '';
                            setTr = ''+
                            '<tr class="tr-'+response.data.role+'">'+
                                '<td colspan="2" align="center">Hanya bisa view organisasi</td>'+
                            '</tr>';

                            jQuery('table#dataTable-tambah-akses-organisasi tbody').append(setTr);
                        }

                        jQuery('#modal_edit').modal('show');

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: response.message
                        });

                    }
                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            });
        });
        
        jQuery('.btn-simpan-edit-user').click( function() {
            var validasi = validasi_user('edit');

            if ( validasi ) {
                jQuery.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                    }
                });

                jQuery(this).prop('disabled',true);
                jQuery('.btn-kembali-user').prop('disabled',true);

                var form_data = new FormData();

                form_data.append('id', jQuery(this).data('id'));
                form_data.append('name', jQuery('#edit-nama-user').val());
                form_data.append('email', jQuery('#edit-email-user').val());
                form_data.append('password', jQuery('#edit-password-user').val());
                form_data.append('role', jQuery('#edit-role-user').val());

                jQuery.ajax({
                    type: 'POST',
                    url: jQuery('#modal_edit #form-edit-user').attr('action'),
                    dataType: 'json',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        if ( data.success ) {
                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: data.message,
                                showCancelButton: false,
                                showConfirmButton: true
                            })
                                .then (function() {
                                    location.reload();
                                });
                        }
                        else {
                            Swal.fire({
                                type: 'warning',
                                title: 'Oops...',
                                text: data.message
                            });

                            jQuery('.btn-simpan-edit-user').prop('disabled',false);
                            jQuery('#modal_edit .btn-kembali-user').prop('disabled',false);
                        }
                    },
                    error: function(data){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });

                        jQuery('.btn-simpan-edit-user').prop('disabled',false);
                        jQuery('#modal_edit .btn-kembali-user').prop('disabled',false);
                    },
                },'json');
            }
        });
        
        detail_user_akses_organisasi();
    }

    if ( jQuery(".tambah-user").length > 0 ) {
        jQuery(".btn-kembali-user").click( function() {
            var user_id_tmp = jQuery('#id-user-tmp').val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "user_id_tmp": user_id_tmp,
                    "_token": token
                },
                success:function(response){
                    window.location.href = jQuery('#redirect-success').val();
                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });

        jQuery('.btn-simpan-user').click( function() {
            var validasi = validasi_user('tambah');

            if ( validasi ) {
                jQuery.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                    }
                });

                jQuery(this).prop('disabled',true);
                jQuery('.btn-kembali-user').prop('disabled',true);

                var form_data = new FormData();

                form_data.append('user_id_tmp', jQuery('#id-user-tmp').val());
                form_data.append('name', jQuery('#tambah-nama-user').val());
                form_data.append('email', jQuery('#tambah-email-user').val());
                form_data.append('password', jQuery('#tambah-password-user').val());
                form_data.append('role', jQuery('#tambah-role-user').val());

                jQuery.ajax({
                    type: 'POST',
                    url: jQuery('#form-user').attr('action'),
                    dataType: 'json',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        if ( data.success ) {
                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: data.message,
                                showCancelButton: false,
                                showConfirmButton: true
                            })
                                .then (function() {
                                    window.location.href = jQuery('#redirect-success').val();
                                });
                        }
                        else {
                            Swal.fire({
                                type: 'warning',
                                title: 'Oops...',
                                text: data.message
                            });

                            jQuery('.btn-simpan-user').prop('disabled',false);
                            jQuery('.btn-kembali-user').prop('disabled',false);
                        }
                    },
                    error: function(data){
                        Swal.fire({
                            type: 'error',
                            title: 'Opps!',
                            text: 'server error!'
                        });

                        jQuery('.btn-simpan-user').prop('disabled',false);
                        jQuery('.btn-kembali-user').prop('disabled',false);
                    },
                },'json');
            }
        });

        detail_user_akses_organisasi();
    }

    function validasi_user(action) {
        var nama_user = jQuery("#"+action+"-nama-user").val();
        var email_user = jQuery("#"+action+"-email-user").val();
        var password_user = jQuery("#"+action+"-password-user").val();
        var role_user = jQuery("#"+action+"-role-user").val();

        if (nama_user.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Nama User Wajib Diisi !'
            });

            return false;

        } else if(email_user.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Email User Wajib Diisi !'
            });

            return false;

        } else if(!validateEmail(email_user)) {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Format Email User Salah !'
            });

            return false;

        } else if(role_user.length == "") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Role User Wajib Diisi !'
            });

            return false;

        } else if(role_user == "account_manager") {

            if ( jQuery('#dataTable-tambah-akses-organisasi tbody').find('tr').length < 1 ) {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'User Akses Organisasi Wajib Diisi !'
                });

                return false;
            }

        }

        if ( action == 'tambah' ) {
            if(password_user.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Password User Wajib Diisi !'
                });

                return false;

            }
        }

        return true;
    }

    function detail_user_akses_organisasi() {
        function reset_modal_form_add_akses_organisasi() {
            jQuery('#modal_add .modal-footer .btn-proses-tambah-akses-organisasi').prop('disabled',false);
            jQuery('#modal_add .modal-footer .btn-batal').prop('disabled',false);
        }

        jQuery(".modal-content .modal-header button.close, .modal-content .modal-footer button.btn-batal").click( function() {
            reset_modal_form_add_akses_organisasi();
        });

        jQuery(".btn-tambah-akses-organisasi").click( function() {
            jQuery('#modal_add').modal('show');
        });

        jQuery('#modal_add .btn-proses-tambah-akses-organisasi').click( function() {
            var user_id_tmp = jQuery('#id-user-tmp').val();
            var akses_organisasi = jQuery('#tambah-akses-organisasi').val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            jQuery(this).prop('disabled',true);
            jQuery('#modal_add .modal-footer .btn-batal').prop('disabled',true);

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "user_id_tmp": user_id_tmp,
                    "akses_organisasi": akses_organisasi,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: response.message
                        });

                        jQuery('#id-user-tmp').val(response.user_id);

                        var setTr = '';
                        setTr = ''+
                        '<tr class="tr-'+response.id+'">'+
                            '<td class="td-name">'+response.data.name+'</td>'+
                            '<td class="td-email">'+response.data.email+'</td>'+
                            '<td class="td-btn">'+
                            '<button title="Hapus" class="btn btn-danger btn-sm btn-hapus-akses-user-organisasi" data-id="'+response.id+'" data-name="'+response.data.name+'"><i class="fas fa-trash"></i></button>'+
                            '</td>'+
                        '</tr>';

                        var tmp_str = jQuery.parseHTML(setTr);

                        jQuery.each(tmp_str,function(index,value){
                            jQuery('table#dataTable-tambah-akses-organisasi tbody').append(value);
                        });

                        reset_modal_form_add_akses_organisasi();

                        jQuery('#modal_add').modal('hide');

                    } else {

                        Swal.fire({
                            type: 'warning',
                            title: 'Oops...',
                            text: response.message
                        });

                        reset_modal_form_add_akses_organisasi();

                        jQuery('#modal_add').modal('hide');

                    }

                    jQuery('#modal_hapus').modal('hide');

                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });

        jQuery(document).on("click", ".btn-hapus-akses-user-organisasi", function (event) {
            var id = jQuery(this).data('id');
            var name = jQuery(this).data('name');
            jQuery('#modal_hapus').find('.modal-body p').text('Anda yakin akan menghapus akses organisasi '+name+'?');
            jQuery('#modal_hapus').find('.btn-proses-hapus-akses-organisasi').data('id',id);
            jQuery('#modal_hapus').modal('show');
        });

        jQuery(".btn-proses-hapus-akses-organisasi").click( function() {
            var id = jQuery(this).data('id');
            var token = jQuery("meta[name='csrf-token']").attr("content");

            var tmp_remove = jQuery('table#dataTable-tambah-akses-organisasi tbody').find('tr.tr-'+id);

            //ajax
            jQuery.ajax({
                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": id,
                    "_token": token
                },
                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: response.message
                        });

                        tmp_remove.remove();

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: response.message
                        });

                    }

                    jQuery('#modal_hapus').modal('hide');

                },
                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });
                }
            })
        });
    }

    // validate must number
    jQuery('#no-telepon, #tambah-pic-no-telepon').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 13) {
            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Masukan angka !'
            });
        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}