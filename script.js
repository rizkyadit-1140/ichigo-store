document.addEventListener('DOMContentLoaded', () => {
    // === 1. KODE UNTUK KALKULASI HARGA & CHECKOUT ===
    const itemCards = document.querySelectorAll('.diamond-card');
    const payCards = document.querySelectorAll('.pay-card');
    
    const checkoutItemName = document.querySelectorAll('.checkout-item')[0]?.querySelectorAll('span')[1]; 
    const checkoutPaymentName = document.querySelectorAll('.checkout-item')[1]?.querySelectorAll('span')[1];
    const checkoutTotal = document.querySelector('.total-price span:last-child');

    if (itemCards.length > 0) {
        itemCards.forEach(card => {
            card.addEventListener('click', () => {
                itemCards.forEach(c => c.style.borderColor = '#7a1b22');
                card.style.borderColor = '#ffae00';

                const itemName = card.querySelector('h4').innerText;
                const itemPrice = card.querySelector('p').innerText;

                if (checkoutItemName) checkoutItemName.innerText = itemName;
                if (checkoutTotal) checkoutTotal.innerText = itemPrice;
                
                const payPrices = document.querySelectorAll('.pay-info p');
                payPrices.forEach(priceText => {
                    priceText.innerText = itemPrice;
                });
            });
        });
    }

    if (payCards.length > 0) {
        payCards.forEach(card => {
            card.addEventListener('click', () => {
                payCards.forEach(c => c.style.borderColor = '#7a1b22');
                card.style.borderColor = '#ffae00';

                const payName = card.querySelector('h4').innerText;
                if (checkoutPaymentName) checkoutPaymentName.innerText = payName;
            });
        });
    }

    // === 2. KODE UNTUK POP-UP LOGIN ===
    // Cari tombol Masuk dan elemen modal/pop-up login di HTML-mu
    const btnLogin = document.querySelector('.btn-login');
    const loginModal = document.querySelector('#loginModal'); // Sesuaikan class/id modal login kamu
    const closeBtn = document.querySelector('.close-modal');   // Tombol silang untuk menutup modal

    if (btnLogin && loginModal) {
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex'; // Menampilkan pop-up
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                loginModal.style.display = 'none'; // Menutup pop-up
            });
        }

        // Tutup modal jika klik di luar area pop-up
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }
    // === 3. KODE UNTUK VALIDASI FORM BELI ===
    const btnBeli = document.querySelector('.btn-beli');

    if (btnBeli) {
        btnBeli.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah halaman reload

            // Cari input ID Pengguna / UID di halaman tersebut
            // Menyesuaikan dengan berbagai jenis input ID di halaman game (ML, Genshin, FF, dll)
            const inputId = document.querySelector('.input-group input'); 
            const selectedItem = document.querySelector('.checkout-item span:last-child')?.innerText;
            const selectedPayment = document.querySelectorAll('.checkout-item')[1]?.querySelectorAll('span')[1]?.innerText;

            // Validasi: Cek apakah input ID kosong
            if (!inputId || inputId.value.trim() === "") {
                alert("⚠️ Mohon masukkan ID Pengguna atau UID terlebih dahulu sebelum membeli!");
                if (inputId) inputId.focus(); // Mengarahkan kursor langsung ke kotak input ID
                return;
            }

            // Jika sudah diisi, tampilkan konfirmasi sukses
            alert(`🎉 Berhasil!\n\nDetail Pesanan:\n- Item: ${selectedItem}\n- Pembayaran: ${selectedPayment}\n- ID: ${inputId.value}\n\nTerima kasih telah berbelanja di Ichigo Store!`);
            
            // Opsional: Reload halaman setelah klik OK pada alert untuk mereset form
            location.reload();
        });
    }
    // === 4. KODE UNTUK LIVE SEARCH (FITUR CARI GAME) ===
    const searchInput = document.querySelector('.search-container input');
    const gameCards = document.querySelectorAll('.game-card');

    if (searchInput && gameCards.length > 0) {
        // Gunakan event 'input' agar bereaksi setiap kali user mengetik
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();

            gameCards.forEach(card => {
                // Ambil teks judul game dari class .game-title
                const titleElement = card.querySelector('.game-title'); 
                
                if (titleElement) {
                    const title = titleElement.innerText.toLowerCase();
                    // Jika judul mengandung huruf yang diketik, tampilkan. Jika tidak, sembunyikan.
                    if (title.includes(searchText)) {
                        card.style.display = 'block'; 
                    } else {
                        card.style.display = 'none'; 
                    }
                }
            });
        });
    }
    // === 5. KODE UNTUK FITUR KODE PROMO (DISCOUNT) ===
    const promoInput = document.querySelector('.promo-input input');
    const btnPromo = document.querySelector('.promo-input button');
    const totalPriceEl = document.querySelector('.total-price span:last-child');
    
    // Variabel untuk mencegah user pakai diskon berkali-kali
    let isPromoApplied = false; 

    if (btnPromo && promoInput && totalPriceEl) {
        btnPromo.addEventListener('click', () => {
            const promoCode = promoInput.value.trim().toUpperCase();

            // 1. Cek apakah input kosong
            if (promoCode === "") {
                alert("⚠️ Masukkan kode promo terlebih dahulu!");
                return;
            }

            // 2. Cek apakah promo sudah pernah dipakai di transaksi ini
            if (isPromoApplied) {
                alert("⚠️ Kode promo sudah digunakan!");
                return;
            }

            // 3. Validasi daftar kode promo yang tersedia
            if (promoCode === "ICHIGOUTS" || promoCode === "RIZKYBOSS") {
                // Ambil harga saat ini (misal teksnya: "IDR 15.000")
                let currentPriceText = totalPriceEl.innerText;
                
                // Hapus tulisan "IDR " dan titik biar angkanya bisa dihitung
                let priceNumber = parseInt(currentPriceText.replace('IDR ', '').replace(/\./g, ''));

                // Berikan diskon (misal potong Rp 5.000)
                let discount = 5000;
                let newPrice = priceNumber - discount;

                // Jangan sampai harganya jadi minus
                if (newPrice < 0) newPrice = 0;

                // Format kembali angkanya jadi bentuk Rupiah (contoh: IDR 10.000)
                // Menggunakan 'id-ID' agar otomatis pakai pemisah titik
                let formattedPrice = 'IDR ' + newPrice.toLocaleString('id-ID');

                // Update teks harga di layar checkout
                totalPriceEl.innerText = formattedPrice;
                
                // Kunci status promo agar tidak bisa dipakai 2 kali
                isPromoApplied = true;

                // Notifikasi sukses dan kosongkan kolom input
                alert(`🎉 Hore! Kode promo ${promoCode} berhasil digunakan!\nKamu mendapat potongan harga sebesar Rp 5.000.`);
                promoInput.value = ""; 
                
            } else {
                // Jika kodenya salah
                alert("❌ Kode promo tidak valid atau sudah kadaluarsa.");
            }
        });
    }
// === 6. KODE SIMULASI LOGIN & GANTI STATE HEADER ===
    const authContainer = document.querySelector('#auth-container');
    
    // Cek saat halaman dimuat, apakah user sudah login sebelumnya
    document.addEventListener("DOMContentLoaded", () => {
        const savedUser = localStorage.getItem("ichigo_username");
        if (savedUser && authContainer) {
            renderUserProfile(savedUser);
        }
    });

    // Fungsi untuk mengubah tombol login menjadi Profil & Nama
    function renderUserProfile(username) {
        if (!authContainer) return;
        
        authContainer.innerHTML = `
            <div class="user-profile-nav" style="display: flex; align-items: center; gap: 8px; cursor: pointer;" title="Klik untuk Logout">
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${username}" alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%; background: #fff; padding: 2px;">
                <span style="font-size: 13px; font-weight: 600; color: #fff;">${username}</span>
            </div>
        `;

        // Klik profil untuk Logout (keluar akun)
        const profileNav = authContainer.querySelector('.user-profile-nav');
        profileNav.addEventListener('click', () => {
            if (confirm("Apakah kamu ingin keluar (logout)?")) {
                localStorage.removeItem("ichigo_username");
                location.reload();
            }
        });
    }
    // === 7. MENANGKAP INPUT DARI FORM LOGIN MODAL (SESUAI HTML) ===
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah halaman reload
            
            // Ambil input email dari form
            const emailInput = loginForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim() !== "") {
                const emailValue = emailInput.value.trim();
                
                // Ambil teks sebelum tanda '@' untuk dijadikan nama user (contoh: budi@gmail.com -> Budi)
                let username = emailValue.split('@')[0];
                username = username.charAt(0).toUpperCase() + username.slice(1);
                
                // Simpan ke localStorage browser
                localStorage.setItem("ichigo_username", username);
                
                // Render ulang tampilan header menjadi foto profil & nama
                renderUserProfile(username);
                
                // Tutup modal pop-up login
                // Pastikan variabel/selector modal login kamu sesuai (misal: .modal-overlay atau #loginModal)
                const loginModal = document.querySelector('#loginModal') || document.querySelector('.modal'); 
                if (loginModal) {
                    loginModal.style.display = 'none';
                }
                
                // Reset form
                loginForm.reset();
            } else {
                alert("⚠️ Mohon masukkan email terlebih dahulu!");
            }
        });
    }

});