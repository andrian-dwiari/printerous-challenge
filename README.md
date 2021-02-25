# printerous-challenge

- Saya menggunakan php versi 7.3
- Saya menggunakan xampp untuk menjalankan apache dan mysql

# Instruksi Setup
1. Silahkan clone atau download folder project terlebih dahulu
2. Buat database mysql baru dengan nama "printerous_challenge"
3. Import file printerous_challenge.sql yang ada di dalam folder project (file di dalam folder db)
4. Sesuaikan settingan .env dengan localhost anda, disini saya menggunakan nama database "printerous_challenge" dengan port 3307
5. Copy folder project "printerous-challenge" ke directory htdocs anda
6. Buka command line dan arahkan ke directory project "printerous-challenge"
7. Jalankan php artisan storage:link di command line
8. Jalankan php artisan serve di command line
9. Jalankan programnya dengan url http://127.0.0.1:8000/ (output dari php artisan serve)
10. di dalam sistem, terdapat menu:
	- Dashboard
	- User
		- Role Akses Organisasi (saat menambahkan user baru dan edit user)
	- Organisasi
		- manage pic (saat menambahkan organisasi baru dan edit organisasi)
	- Keluar
11. Silahkan login terlebih dahulu
	
	Disini saya menyediakan 4 akun:

	a. administrator
		- email: admin@admin.com
		- password: 123456

		catatan: 
			- bisa membuka semua menu dan semua akses di dalam sistem
			- bisa mengelola semua data user serta memberikan akses untuk user Account Manager
			- bisa mengelola semua data organisasi

	b. Account Manager 1
		- email: am1@am1.com
		- password: 123456

		catatan: 
			- hanya bisa membuka menu (Dashboard, Organisasi, dan Keluar)
			- bisa membuat organisasi baru serta menambahkan pic di dalam organisasi, setelah itu harus request akses ke administrator untuk bisa (edit dan delete) organisasi yang baru dibuat
			- bisa mengelola (edit dan delete) organisasi setelah diberi akses oleh administrator
			- jika tidak ada akses hanya bisa preview saja
			- bisa preview semua organisasi

	c. Account Manager 2
		- email: am2@am2.com
		- password: 123456

		catatan: 
			- hanya bisa membuka menu (Dashboard, Organisasi, dan Keluar)
			- bisa membuat organisasi baru serta menambahkan pic di dalam organisasi, setelah itu harus request akses ke administrator untuk bisa (edit dan delete) organisasi yang baru dibuat
			- bisa mengelola (edit dan delete) organisasi setelah diberi akses oleh administrator
			- jika tidak ada akses hanya bisa preview saja
			- bisa preview semua organisasi

	d. Member 1
		- email: member@member.com
		- password: 123456

		catatan: 
			- hanya bisa membuka menu (Dashboard, Organisasi, dan Keluar)
			- hanya bisa preview organisasi saja

12. Semua menu sudah berfungsi dengan baik, silahkan ditest


Terima kasih