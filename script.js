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
});