// Fungsi untuk mengecek apakah user sudah login
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    } else if (!currentUser && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
}

// Panggil fungsi checkLogin saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
    
    // Login Form
    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            
            // Reset error messages
            emailError.textContent = '';
            passwordError.textContent = '';
            
            // Validasi input
            let isValid = true;
            
            if (!email) {
                emailError.textContent = 'Email harus diisi';
                isValid = false;
            }
            
            if (!password) {
                passwordError.textContent = 'Password harus diisi';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Cek user di local storage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Simpan user yang login ke local storage
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                passwordError.textContent = 'Email atau password salah';
            }
        });
    }
    
    // Register Form
    if (document.getElementById('registerForm')) {
        const registerForm = document.getElementById('registerForm');
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmError = document.getElementById('confirmError');
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmError.textContent = '';
            
            // Validasi input
            let isValid = true;
            
            if (!name) {
                nameError.textContent = 'Nama harus diisi';
                isValid = false;
            }
            
            if (!email) {
                emailError.textContent = 'Email harus diisi';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                emailError.textContent = 'Email tidak valid';
                isValid = false;
            }
            
            if (!password) {
                passwordError.textContent = 'Password harus diisi';
                isValid = false;
            } else if (password.length < 6) {
                passwordError.textContent = 'Password minimal 6 karakter';
                isValid = false;
            }
            
            if (!confirmPassword) {
                confirmError.textContent = 'Konfirmasi password harus diisi';
                isValid = false;
            } else if (password !== confirmPassword) {
                confirmError.textContent = 'Password tidak cocok';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Cek apakah email sudah terdaftar
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const emailExists = users.some(user => user.email === email);
            
            if (emailExists) {
                emailError.textContent = 'Email sudah terdaftar';
                return;
            }
            
            // Tambahkan user baru
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Redirect ke halaman login
            window.location.href = 'index.html';
        });
    }
    
    // Dashboard
    if (document.getElementById('userEmail')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Tampilkan info user
        document.getElementById('userEmail').textContent = currentUser.email;
        document.getElementById('userName').textContent = currentUser.name;
        
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
        
        // Hapus akun
        document.getElementById('deleteAccountBtn').addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.filter(user => user.email !== currentUser.email);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }
        });
    }
});