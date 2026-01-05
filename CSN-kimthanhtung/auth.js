// Quản lý xác thực người dùng

// Khởi tạo dữ liệu mẫu
function initializeDemoUsers() {
    if (!localStorage.getItem('users')) {
        const demoUsers = [
            {
                username: 'admin',
                password: '123456',
                fullname: 'Quản Trị Viên',
                email: 'admin@example.com'
            },
            {
                username: 'student',
                password: '123456',
                fullname: 'Sinh Viên',
                email: 'student@example.com'
            }
        ];
        localStorage.setItem('users', JSON.stringify(demoUsers));
    }
}

// Kiểm tra đăng nhập
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = 'login.html';
    }
    return currentUser ? JSON.parse(currentUser) : null;
}

// Đăng nhập
function login(username, password, remember) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const userData = {
            username: user.username,
            fullname: user.fullname,
            email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        return { success: true, user: userData };
    }
    
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng!' };
}

// Đăng ký
function register(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Kiểm tra tên đăng nhập đã tồn tại
    if (users.find(u => u.username === userData.username)) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại!' };
    }
    
    // Kiểm tra email đã tồn tại
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email đã được sử dụng!' };
    }
    
    // Thêm người dùng mới
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Đăng ký thành công!' };
}

// Đăng xuất
async function logout() {
    try {
        const formData = new FormData();
        formData.append('action', 'logout');
        
        await fetch('auth_handler.php', {
            method: 'POST',
            body: formData
        });
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
    }
    
    window.location.href = 'login.html';
}

// Xử lý form đăng nhập
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        formData.append('action', 'login');
        
        const messageDiv = document.getElementById('loginMessage');
        
        try {
            const response = await fetch('auth_handler.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                messageDiv.className = 'message success';
                messageDiv.textContent = data.message;
                
                // Chuyển hướng dựa trên quyền
                setTimeout(() => {
                    if (data.user.username === 'tung') {
                        window.location.href = 'admin.php';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1000);
            } else {
                messageDiv.className = 'message error';
                messageDiv.textContent = data.message;
            }
        } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Có lỗi xảy ra, vui lòng thử lại.';
        }
    });
}

// Xử lý form đăng ký
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const messageDiv = document.getElementById('registerMessage');
        
        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Mật khẩu xác nhận không khớp!';
            return;
        }
        
        const formData = new FormData(e.target);
        formData.append('action', 'register');
        
        try {
            const response = await fetch('auth_handler.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                messageDiv.className = 'message success';
                messageDiv.textContent = data.message + ' Đang chuyển đến trang đăng nhập...';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                messageDiv.className = 'message error';
                messageDiv.textContent = data.message;
            }
        } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Có lỗi xảy ra, vui lòng thử lại.';
        }
    });
}

// Kiểm tra đăng nhập khi tải trang chính (tạm thời bỏ qua để website chạy được)
// Sẽ kích hoạt lại khi có PHP backend
