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

            if(email.length == "") {

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

            } else {

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

        });
	}

	if ( jQuery(".organisasi").length > 0 ) {
		jQuery('#dataTable-organisasi').DataTable();

		// jQuery(".btn-ubah").click( function() {
		// 	var id = jQuery(this).data('id');
		// 	var name = jQuery(this).data('name');
		// 	jQuery('#modal_edit').find('#nama-kategori').val(name);
		// 	jQuery('#modal_edit').find('.btn-proses-ubah').data('id',id);
		// 	jQuery('#modal_edit').modal('show');
		// });

		// jQuery(".btn-proses-ubah").click( function() {
  //           var id = jQuery(this).data('id');
  //           var name = jQuery(this).parents('#modal_edit').find('#nama-kategori').val();
  //           var token = jQuery("meta[name='csrf-token']").attr("content");

  //           if (name.length == "") {

  //               Swal.fire({
  //                   type: 'warning',
  //                   title: 'Oops...',
  //                   text: 'Nama Kategori Wajib Diisi !'
  //               });

  //           } else {


	 //            //ajax
	 //            jQuery.ajax({

	 //                url: jQuery(this).data('action'),
	 //                type: "POST",
	 //                cache: false,
	 //                data: {
	 //                    "id": id,
	 //                    "name": name,
	 //                    "_token": token
	 //                },

	 //                success:function(response){

	 //                    if (response.success) {

	 //                        Swal.fire({
	 //                            type: 'success',
	 //                            title: 'Berhasil!',
	 //                            text: 'Data berhasil diubah',
	 //                            timer: 2000,
	 //                            showCancelButton: false,
	 //                            showConfirmButton: false
	 //                        })
	 //                            .then (function() {
	 //                                location.reload();
	 //                            });

	 //                    } else {

	 //                        Swal.fire({
	 //                            type: 'error',
	 //                            title: 'Gagal!',
	 //                            text: 'Data gagal diubah, silahkan coba lagi!'
	 //                        });

	 //                    }

	 //                },

	 //                error:function(response){
	 //                    Swal.fire({
	 //                        type: 'error',
	 //                        title: 'Opps!',
	 //                        text: 'server error!'
	 //                    });
	 //                }

	 //            })

  //           }
  //       });

		// jQuery(".btn-lihat").click( function() {
		// 	var id = jQuery(this).data('id');
		// 	var name = jQuery(this).data('name');
		// 	jQuery('#modal_lihat').find('#lihat-nama-kategori').val(name);
		// 	jQuery('#modal_lihat').modal('show');
		// });

		// jQuery(".btn-hapus").click( function() {
		// 	var id = jQuery(this).data('id');
		// 	var name = jQuery(this).data('name');
		// 	jQuery('#modal_hapus').find('.modal-body p').text('Anda yakin akan menghapus kategori '+name+'?');
		// 	jQuery('#modal_hapus').find('.btn-proses-hapus').data('id',id);
		// 	jQuery('#modal_hapus').modal('show');
		// });

		// jQuery(".btn-proses-hapus").click( function() {
  //           var id = jQuery(this).data('id');
  //           var token = jQuery("meta[name='csrf-token']").attr("content");

  //           //ajax
  //           jQuery.ajax({

  //               url: jQuery(this).data('action'),
  //               type: "POST",
  //               cache: false,
  //               data: {
  //                   "id": id,
  //                   "_token": token
  //               },

  //               success:function(response){

  //                   if (response.success) {

  //                       Swal.fire({
  //                           type: 'success',
  //                           title: 'Berhasil!',
  //                           text: 'Data berhasil dihapus',
  //                           timer: 2000,
  //                           showCancelButton: false,
  //                           showConfirmButton: false
  //                       })
  //                           .then (function() {
  //                               location.reload();
  //                           });

  //                   } else {

  //                       Swal.fire({
  //                           type: 'error',
  //                           title: 'Gagal!',
  //                           text: 'Data gagal dihapus, silahkan coba lagi!'
  //                       });

  //                   }

  //               },

  //               error:function(response){
  //                   Swal.fire({
  //                       type: 'error',
  //                       title: 'Opps!',
  //                       text: 'server error!'
  //                   });
  //               }

  //           })
  //       });
	}

	if ( jQuery(".tambah-organisasi").length > 0 ) {

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
                    text: 'Nama Wajib Diisi !'
                });

                return false;

            } else if(email_pic.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Email Wajib Diisi !'
                });

                return false;

            } else if(!validateEmail(email_pic)) {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Format Email Salah !'
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

                            jQuery('table#dataTable-tambah-pic tbody tr.tr-'+id).find('tr.tr-'+id).remove();
                            jQuery('table#dataTable-tambah-pic tbody').find('.td-name').text(data.response.name);
                            jQuery('table#dataTable-tambah-pic tbody').find('.td-email').text(data.response.email);
                            jQuery('table#dataTable-tambah-pic tbody').find('.td-phone').text(data.response.phone);

                            if ( data.ubah_avatar ) {
                                jQuery('table#dataTable-tambah-pic tbody').find('.td-avatar img').attr('src',data.public_url);
                                jQuery('table#dataTable-tambah-pic tbody').find('.td-avatar img').attr('alt',data.response.name);
                                jQuery('table#dataTable-tambah-pic tbody').find('.td-avatar img').attr('title',data.response.name);
                            }

                            jQuery('table#dataTable-tambah-pic tbody').find('.td-btn .btn-edit-pic').data('name',data.response.name);
                            jQuery('table#dataTable-tambah-pic tbody').find('.td-btn .btn-edit-pic').data('email',data.response.email);
                            jQuery('table#dataTable-tambah-pic tbody').find('.td-btn .btn-edit-pic').data('phone',data.response.phone);

                            jQuery('table#dataTable-tambah-pic tbody').find('.td-btn .btn-hapus-pic').data('name',data.response.name);

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