// Interaksi untuk titik-titik (dots) di bawah banner
function currentSlide(n) {
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[n - 1].className += " active";
}

// Logika Modal Login
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeModal = document.getElementById("closeModal");

// Buka modal saat tombol "Masuk" diklik
loginBtn.addEventListener("click", function() {
    loginModal.style.display = "flex";
});

// Tutup modal saat tombol 'X' diklik
closeModal.addEventListener("click", function() {
    loginModal.style.display = "none";
});

// Tutup modal jika pengguna mengklik area hitam di luar modal
window.addEventListener("click", function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});

// Interaksi tombol pencarian (dummy)
document.getElementById("searchBtn").addEventListener("click", function() {
    let query = document.getElementById("searchInput").value;
    if(query.trim() !== "") {
        alert("Mencari game: " + query);
    } else {
        alert("Masukkan nama game terlebih dahulu.");
    }
});