jQuery(window).on('load',function() {
    // load a locale
    numeral.register('locale', 'id', {
      delimiters: {
          thousands: '.',
          million: '.',
          billion: '.',
          trillion: '.',
          decimal: ','
      },
      abbreviations: {
          thousand: 'ribu',
          million: 'juta',
          billion: 'milyar',
          trillion: 'triliun'
      },
      // ordinal : function (number) {
      //     return number === 1 ? 'er' : '�me';
      // },
      currency: {
          symbol: 'Rp'
      }
    });

    // switch between locales
    numeral.locale('id');
});

jQuery(document).ready(function() {
	if ( jQuery(".register").length > 0 ) {
		jQuery(".btn-register").click( function() {

            var nama_lengkap = jQuery("#inputName").val();
            var email    = jQuery("#inputEmailAddress").val();
            var password = jQuery("#inputPassword").val();
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
                        "_token": token
                    },

                    success:function(response){

                        if (response.success) {

                            Swal.fire({
                                type: 'success',
                                title: 'Register Berhasil!',
                                text: 'silahkan login!'
                            });

                            jQuery("#nama_lengkap").val('');
                            jQuery("#email").val('');
                            jQuery("#password").val('');

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

	if ( jQuery(".kategori-produk").length > 0 ) {
		jQuery('#dataTable-kategori').DataTable();

		jQuery(".btn-ubah").click( function() {
			var id = jQuery(this).data('id');
			var name = jQuery(this).data('name');
			jQuery('#modal_edit').find('#nama-kategori').val(name);
			jQuery('#modal_edit').find('.btn-proses-ubah').data('id',id);
			jQuery('#modal_edit').modal('show');
		});

		jQuery(".btn-proses-ubah").click( function() {
            var id = jQuery(this).data('id');
            var name = jQuery(this).parents('#modal_edit').find('#nama-kategori').val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            if (name.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Nama Kategori Wajib Diisi !'
                });

            } else {


	            //ajax
	            jQuery.ajax({

	                url: jQuery(this).data('action'),
	                type: "POST",
	                cache: false,
	                data: {
	                    "id": id,
	                    "name": name,
	                    "_token": token
	                },

	                success:function(response){

	                    if (response.success) {

	                        Swal.fire({
	                            type: 'success',
	                            title: 'Berhasil!',
	                            text: 'Data berhasil diubah',
	                            timer: 2000,
	                            showCancelButton: false,
	                            showConfirmButton: false
	                        })
	                            .then (function() {
	                                location.reload();
	                            });

	                    } else {

	                        Swal.fire({
	                            type: 'error',
	                            title: 'Gagal!',
	                            text: 'Data gagal diubah, silahkan coba lagi!'
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

		jQuery(".btn-lihat").click( function() {
			var id = jQuery(this).data('id');
			var name = jQuery(this).data('name');
			jQuery('#modal_lihat').find('#lihat-nama-kategori').val(name);
			jQuery('#modal_lihat').modal('show');
		});

		jQuery(".btn-hapus").click( function() {
			var id = jQuery(this).data('id');
			var name = jQuery(this).data('name');
			jQuery('#modal_hapus').find('.modal-body p').text('Anda yakin akan menghapus kategori '+name+'?');
			jQuery('#modal_hapus').find('.btn-proses-hapus').data('id',id);
			jQuery('#modal_hapus').modal('show');
		});

		jQuery(".btn-proses-hapus").click( function() {
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
                            text: 'Data berhasil dihapus',
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                            .then (function() {
                                location.reload();
                            });

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: 'Data gagal dihapus, silahkan coba lagi!'
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
        });
	}

	if ( jQuery(".tambah-kategori-produk").length > 0 ) {
		jQuery(".btn-simpan").click( function() {
            var nama_kategori = jQuery("#nama-kategori").val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            if (nama_kategori.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Nama Kategori Wajib Diisi !'
                });

            } else {

                //ajax
                jQuery.ajax({

                    url: jQuery(".tambah-kategori-produk form").attr('action'),
                    type: "POST",
                    cache: false,
                    data: {
                        "nama_kategori": nama_kategori,
                        "_token": token
                    },

                    success:function(response){

                        if (response.success) {

                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: 'Data berhasil disimpan',
                                timer: 2000,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                                .then (function() {
                                    window.location.href = jQuery("#redirect-success").val();
                                });

                        } else {

                            Swal.fire({
                                type: 'error',
                                title: 'Gagal!',
                                text: 'Data gagal disimpan, silahkan coba lagi!'
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

	if ( jQuery(".produk").length > 0 ) {
		jQuery('#dataTable-produk').DataTable();

		jQuery(".btn-lihat").click( function() {
			var id = jQuery(this).data('id');
			var nama_produk = jQuery(this).data('namaproduk');
			var kategori = jQuery(this).data('kategori');
			var harga_produk = jQuery(this).data('hargaproduk');
			var stok_produk = jQuery(this).data('stokproduk');
			var diskon_produk = jQuery(this).data('diskonproduk');
			jQuery('#modal_lihat').find('#lihat-nama-produk').val(nama_produk);
			jQuery('#modal_lihat').find('#lihat-kategori-produk').val(kategori);
			jQuery('#modal_lihat').find('#lihat-harga-produk').val(harga_produk);
			jQuery('#modal_lihat').find('#lihat-stok-produk').val(stok_produk);
			jQuery('#modal_lihat').find('#lihat-diskon-produk').val(diskon_produk);
			jQuery('#modal_lihat').modal('show');
		});

		jQuery(".btn-ubah").click( function() {
			jQuery('#modal_edit').find('#ubah-kategori-produk option').remove();

			var id = jQuery(this).data('id');
			var nama_produk = jQuery(this).data('namaproduk');
			var kategori_id = jQuery(this).data('idkategori');
			var kategori_nama = jQuery(this).data('namakategori');
			var harga_produk = jQuery(this).data('hargaproduk');
			var stok_produk = jQuery(this).data('stokproduk');
			var diskon_produk = jQuery(this).data('diskonproduk');
			jQuery('#modal_edit').find('#ubah-nama-produk').val(nama_produk);
			jQuery('#modal_edit').find('#ubah-harga-produk').val(harga_produk);
			jQuery('#modal_edit').find('#ubah-stok-produk').val(stok_produk);
			jQuery('#modal_edit').find('#ubah-diskon-produk').val(diskon_produk);
			jQuery('#modal_edit').find('.btn-proses-ubah').data('id',id);

			var setOption1 = '<option value="'+kategori_id+'">'+kategori_nama+'</option> <option value="">--- Pilih ---</option>';
			jQuery('#modal_edit').find('#ubah-kategori-produk').append(setOption1);

			setOption2 = ''+
			jQuery.each(tmp_list_category,function(k,v){
				if ( v.id != kategori_id ) {
					setOption2 = '<option value="'+v.id+'">'+v.name+'</option>';
					jQuery('#modal_edit').find('#ubah-kategori-produk').append(setOption2);
				}
			});

			jQuery('#modal_edit').modal('show');
		});

		jQuery(".btn-proses-ubah").click( function() {
            var id = jQuery(this).data('id');
            var nama_produk = jQuery(this).parents('#modal_edit').find('#ubah-nama-produk').val();
            var kategori = jQuery(this).parents('#modal_edit').find('#ubah-kategori-produk').val();
            var harga_produk = jQuery(this).parents('#modal_edit').find('#ubah-harga-produk').val();
            var stok_produk = jQuery(this).parents('#modal_edit').find('#ubah-stok-produk').val();
            var diskon_produk = jQuery(this).parents('#modal_edit').find('#ubah-diskon-produk').val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            if (nama_produk.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Nama Produk Wajib Diisi !'
                });

            } else if (kategori.length == "") {

            	Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Kategori Wajib Diisi !'
                });

            } else if (harga_produk.length == "") {

            	Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Harga Produk Wajib Diisi !'
                });

            } else if (stok_produk.length == "") {

            	Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Stok Produk Wajib Diisi !'
                });

            } else {

                //ajax
                jQuery.ajax({

                    url: jQuery(this).data('action'),
                    type: "POST",
                    cache: false,
                    data: {
                        "id": id,
                        "nama_produk": nama_produk,
                        "kategori": kategori,
                        "harga_produk": harga_produk,
                        "stok_produk": stok_produk,
                        "diskon_produk": diskon_produk,
                        "_token": token
                    },

                    success:function(response){

                        if (response.success) {

                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: 'Data berhasil disimpan',
                                timer: 2000,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                                .then (function() {
                                    location.reload();
                                });

                        } else {

                            Swal.fire({
                                type: 'error',
                                title: 'Gagal!',
                                text: 'Data gagal disimpan, silahkan coba lagi!'
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

		jQuery(".btn-hapus").click( function() {
			var id = jQuery(this).data('id');
			var nama_produk = jQuery(this).data('namaproduk');
			jQuery('#modal_hapus').find('.modal-body p').text('Anda yakin akan menghapus produk '+nama_produk+'?');
			jQuery('#modal_hapus').find('.btn-proses-hapus').data('id',id);
			jQuery('#modal_hapus').modal('show');
		});

		jQuery(".btn-proses-hapus").click( function() {
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
                            text: 'Data berhasil dihapus',
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                            .then (function() {
                                location.reload();
                            });

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: 'Data gagal dihapus, silahkan coba lagi!'
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
        });
	}

	if ( jQuery(".tambah-produk").length > 0 ) {
		jQuery(".btn-simpan").click( function() {
            var nama_produk = jQuery("#nama-produk").val();
            var kategori = jQuery("#kategori").val();
            var harga_produk = jQuery("#harga-produk").val();
            var stok_produk = jQuery("#stok-produk").val();
            var diskon_produk = jQuery("#diskon-produk").val();
            var token = jQuery("meta[name='csrf-token']").attr("content");

            if (nama_produk.length == "") {

                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Nama Produk Wajib Diisi !'
                });

            } else if (kategori.length == "") {

            	Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Kategori Wajib Diisi !'
                });

            } else if (harga_produk.length == "") {

            	Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Harga Produk Wajib Diisi !'
                });

            } else if (stok_produk.length == "") {

            	Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Stok Produk Wajib Diisi !'
                });

            } else {

                //ajax
                jQuery.ajax({

                    url: jQuery(".tambah-produk form").attr('action'),
                    type: "POST",
                    cache: false,
                    data: {
                        "nama_produk": nama_produk,
                        "kategori": kategori,
                        "harga_produk": harga_produk,
                        "stok_produk": stok_produk,
                        "diskon_produk": diskon_produk,
                        "_token": token
                    },

                    success:function(response){

                        if (response.success) {

                            Swal.fire({
                                type: 'success',
                                title: 'Berhasil!',
                                text: 'Data berhasil disimpan',
                                timer: 2000,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                                .then (function() {
                                    window.location.href = jQuery("#redirect-success").val();
                                });

                        } else {

                            Swal.fire({
                                type: 'error',
                                title: 'Gagal!',
                                text: 'Data gagal disimpan, silahkan coba lagi!'
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

	if ( jQuery(".transaksi").length > 0 ) {
		jQuery('#dataTable-transaksi').DataTable();

		jQuery(".btn-lihat").click( function() {
			var id = jQuery(this).data('id');
			var token = jQuery("meta[name='csrf-token']").attr("content");

			jQuery('#modal_lihat table#dataTable-lihat-transaksi tbody tr').remove();
			
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
                	console.log(response);
                	jQuery('#modal_lihat').find('#invoice').val(response.transaksi[0].invoice);
                	jQuery('#modal_lihat').find('#tgl_transaksi').val(response.transaksi[0].created_at);
                	jQuery('#modal_lihat').find('#username').val(response.transaksi[0].username);
                	jQuery('#modal_lihat').find('#gt').val(numeral(parseInt(response.transaksi[0].grandtotal)).format('0,0'));
                	jQuery('#modal_lihat').find('#pembayaran').val(numeral(parseInt(response.transaksi[0].pembayaran)).format('0,0'));
                	jQuery('#modal_lihat').find('#kembalian').val(numeral(parseInt(response.transaksi[0].kembalian)).format('0,0'));

                	
					// var tmp_str = jQuery.parseHTML(setTr);

					var setTr = '';
					jQuery.each(response.transaksi_detail,function(index,value){
						setTr = ''+
						'<tr class="tr-'+value.id+'">'+
							'<td>'+value.nama_kategori+'</td>'+
							'<td>'+value.nama_produk+'</td>'+
							'<td>'+numeral(parseInt(value.harga_produk)).format('0,0')+'</td>'+
							'<td>'+value.qty+'</td>'+
							'<td>'+value.diskon+'</td>'+
							'<td>'+numeral(parseInt(value.subtotal)).format('0,0')+'</td>'+
						'</tr>';

						jQuery('#modal_lihat table#dataTable-lihat-transaksi tbody').append(setTr);
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

            })
		});
	}

	if ( jQuery(".tambah-transaksi").length > 0 ) {

		function reset_modal_form_detail() {
			jQuery('#tambah-detail-produk').val('');

			jQuery('#tambah-detail-kategori-produk').data('kategoriname', '');
			jQuery('#tambah-detail-kategori-produk').val('');

			jQuery('#tambah-detail-harga-produk').data('harga', '');
			jQuery('#tambah-detail-harga-produk').val('');

			jQuery('#tambah-detail-diskon-produk').data('diskon', '');
			jQuery('#tambah-detail-diskon-produk').val('');

			jQuery('#tambah-detail-qty-produk').data('qty', '');
			jQuery('#tambah-detail-qty-produk').val('');

			jQuery('#tambah-detail-subtotal-produk').data('subtotal', '');
			jQuery('#tambah-detail-subtotal-produk').val('');
		}

		function reset_modal_form_detail_change_product() {
			jQuery('#tambah-detail-kategori-produk').data('kategoriname', '');
			jQuery('#tambah-detail-kategori-produk').val('');

			jQuery('#tambah-detail-harga-produk').data('harga', '');
			jQuery('#tambah-detail-harga-produk').val('');

			jQuery('#tambah-detail-diskon-produk').data('diskon', '');
			jQuery('#tambah-detail-diskon-produk').val('');

			jQuery('#tambah-detail-qty-produk').data('qty', '');
			jQuery('#tambah-detail-qty-produk').val('');

			jQuery('#tambah-detail-subtotal-produk').data('subtotal', '');
			jQuery('#tambah-detail-subtotal-produk').val('');
		}

		jQuery(".modal-content .modal-header button.close, .modal-content .modal-footer button.batal").click( function() {
			reset_modal_form_detail();
		});

		jQuery(".btn-tambah-detail").click( function() {
			jQuery('#modal_add').modal('show');
		});

		jQuery("#modal_add select#tambah-detail-produk").change( function() {
			reset_modal_form_detail_change_product();

			var optSelected = jQuery(this).find(":selected");
			
			jQuery('#tambah-detail-kategori-produk').data('kategoriname', optSelected.data('kategoriname'));
			jQuery('#tambah-detail-kategori-produk').val(optSelected.data('kategoriname'));

			jQuery('#tambah-detail-harga-produk').data('harga', optSelected.data('harga'));
			jQuery('#tambah-detail-harga-produk').val(numeral(parseInt(optSelected.data('harga'))).format('0,0'));

			jQuery('#tambah-detail-diskon-produk').data('diskon', optSelected.data('diskon'));
			jQuery('#tambah-detail-diskon-produk').val(optSelected.data('diskon'));
		});

		jQuery("#modal_add #tambah-detail-qty-produk").change( function() {
			var token = jQuery("meta[name='csrf-token']").attr("content");
			var produk_id = jQuery('#tambah-detail-produk').val();
			var qty = jQuery(this).val();

			//ajax cek stok
            jQuery.ajax({

                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "id": produk_id,
                    "qty": qty,
                    "_token": token
                },

                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Stok aman!'
                        });

                        jQuery("#modal_add .btn-proses-tambah").prop('disabled',false);

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: 'Stok kurang dari quantity!'
                        });

                        jQuery("#modal_add .btn-proses-tambah").prop('disabled',true);

                    }

                },

                error:function(response){
                    Swal.fire({
                        type: 'error',
                        title: 'Opps!',
                        text: 'server error!'
                    });

                    jQuery("#modal_add .btn-proses-tambah").prop('disabled',true);
                }

            })

			var harga = jQuery('#tambah-detail-harga-produk').data('harga');
			var diskon = jQuery('#tambah-detail-diskon-produk').data('diskon');

			var subtotal = harga * qty;
			var diskon_nominal = subtotal * diskon / 100;
			var subtotal = subtotal - diskon_nominal
			
			jQuery('#tambah-detail-subtotal-produk').data('subtotal', subtotal);
			jQuery('#tambah-detail-subtotal-produk').val(numeral(parseInt(subtotal)).format('0,0'));
		});

		jQuery("#modal_add .btn-proses-tambah").click( function() {
			var optSelected = jQuery('#tambah-detail-produk').find(":selected");
			var produk_id = optSelected.val();
			var produk_name = optSelected.data('produkname');

			var kategori_id = jQuery('#tambah-detail-kategori-produk').data('kategoriname');
			var kategori_name = jQuery('#tambah-detail-kategori-produk').val();

			var harga = jQuery('#tambah-detail-harga-produk').data('harga');
			var qty = jQuery('#tambah-detail-qty-produk').val();
			var diskon = jQuery('#tambah-detail-diskon-produk').data('diskon');
			var subtotal = jQuery('#tambah-detail-subtotal-produk').data('subtotal');

			var setTr = '';
			setTr = ''+
			'<tr class="tr-'+produk_id+'">'+
				'<td><input type="hidden" class="kategori_name" value="'+kategori_name+'">'+kategori_name+'</td>'+
				'<td><input type="hidden" class="produk_name" value="'+produk_name+'" data-produkid="'+produk_id+'">'+produk_name+'</td>'+
				'<td><input type="hidden" class="produk_harga" value="'+harga+'">'+numeral(parseInt(harga)).format('0,0')+'</td>'+
				'<td><input type="hidden" class="produk_qty" value="'+qty+'">'+qty+'</td>'+
				'<td><input type="hidden" class="produk_diskon" value="'+diskon+'">'+diskon+'</td>'+
				'<td><input type="hidden" class="produk-subtotal" value="'+subtotal+'">'+numeral(parseInt(subtotal)).format('0,0')+'</td>'+
				'<td><button title="Hapus" class="btn btn-danger btn-sm btn-hapus-detail" data-id="'+produk_id+'"><i class="fas fa-trash"></i></button></td>'+
			'</tr>';

			var tmp_str = jQuery.parseHTML(setTr);

			jQuery.each(tmp_str,function(index,value){
				jQuery('table#dataTable-tambah-transaksi tbody').append(value);
			});

			reset_modal_form_detail();

			jQuery('#modal_add').modal('hide');

			cek_grandtotal();
		})

		jQuery(document).on("click", ".btn-hapus-detail", function (event) {
        	var id = jQuery(this).data('id');
        	jQuery('table#dataTable-tambah-transaksi tbody').find('tr.tr-'+id).remove();

        	cek_grandtotal();
        });

        function cek_grandtotal() {
        	if ( jQuery('table#dataTable-tambah-transaksi tbody').find('tr').length > 0 ) {
        		var list_tr = jQuery('table#dataTable-tambah-transaksi tbody tr').find('.produk-subtotal');
        		var gt = 0;
        		jQuery.each(list_tr,function(index,value){
					var st = jQuery(value).val();
					gt += st++;
				});

				jQuery('#grandtotal').val(numeral(parseInt(gt)).format('0,0'));
        		jQuery('#grandtotal').data('grandtotal', gt);
        	}
        	else {
        		jQuery('#grandtotal').val(numeral(parseInt(0)).format('0,0'));
        		jQuery('#grandtotal').data('grandtotal', 0);
        	}

        	jQuery('#pembayaran').val(numeral(parseInt(0)).format('0,0'));
        	jQuery('#pembayaran').data('pembayaran', 0);

        	jQuery('#kembalian').val(numeral(parseInt(0)).format('0,0'));
        	jQuery('#kembalian').data('kembalian', 0);

        	jQuery('.btn-simpan').prop('disabled', true);
        }

        jQuery("#pembayaran").change( function() {
        	jQuery('.btn-simpan').prop('disabled', false);
        	var gt = jQuery('#grandtotal').data('grandtotal');

        	var pembayaran = jQuery(this).val();
        	jQuery('#pembayaran').val(numeral(parseInt(jQuery(this).val())).format('0,0'));
        	jQuery('#pembayaran').data('pembayaran', jQuery(this).val().replace('.',''));

        	var kembalian = pembayaran - gt;
        	jQuery('#kembalian').val(numeral(parseInt(kembalian)).format('0,0'));
        	jQuery('#kembalian').data('kembalian', kembalian);
        });

		// validate must number
		jQuery('#pembayaran').keypress(function (e) {
			if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 13) {
				Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Masukan angka !'
                });
			}
		});

		jQuery(".btn-simpan").click( function() {
			var token = jQuery("meta[name='csrf-token']").attr("content");
        	var gt = jQuery('#grandtotal').data('grandtotal');
        	var pembayaran = jQuery('#pembayaran').data('pembayaran');
        	var kembalian = jQuery('#kembalian').data('kembalian');

        	// detail
        	var detail_form = [];
        	var list_tr = jQuery('table#dataTable-tambah-transaksi tbody tr');
        	jQuery.each(list_tr,function(index,value){
				var kategori_name = jQuery(value).find('.kategori_name').val();
				var produk_id = jQuery(value).find('.produk_name').data('produkid');
				var produk_name = jQuery(value).find('.produk_name').val();
				var produk_harga = jQuery(value).find('.produk_harga').val();
				var produk_qty = jQuery(value).find('.produk_qty').val();
				var produk_diskon = jQuery(value).find('.produk_diskon').val();
				var produk_subtotal = jQuery(value).find('.produk-subtotal').val();
				
				var data_detail = {
					kategori_name:kategori_name,
					produk_id:produk_id,
					produk_name:produk_name,
					produk_harga:produk_harga,
					produk_qty:produk_qty,
					produk_diskon:produk_diskon,
					produk_subtotal:produk_subtotal
				};
				detail_form.push(data_detail)
			});

            //ajax
            jQuery.ajax({

                url: jQuery(this).data('action'),
                type: "POST",
                cache: false,
                data: {
                    "gt": gt,
                    "pembayaran": pembayaran,
                    "kembalian": kembalian,
                    "detail_form": detail_form,
                    "_token": token
                },

                success:function(response){

                    if (response.success) {

                        Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Data berhasil disimpan',
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                            .then (function() {
                                window.location.href = jQuery("#redirect-success").val();
                            });

                    } else {

                        Swal.fire({
                            type: 'error',
                            title: 'Gagal!',
                            text: 'Data gagal disimpan, silahkan coba lagi!'
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

        });
	}
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}