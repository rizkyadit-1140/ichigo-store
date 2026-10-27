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
});