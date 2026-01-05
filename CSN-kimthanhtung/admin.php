<?php
require_once 'config.php';

// Kiểm tra quyền admin
if (!isLoggedIn() || $_SESSION['username'] !== 'tung') {
    redirect('login.html');
}

$currentUser = getCurrentUser();
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản Trị - Thuật Toán Sắp Xếp</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .admin-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .admin-header { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 10px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #1e90ff; }
        .data-table { background: white; padding: 20px; border-radius: 10px; overflow-x: auto; }
        .data-table table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        .data-table th { background: #f8f9fa; font-weight: bold; }
        .status-new { color: #dc3545; }
        .status-processing { color: #ffc107; }
        .status-resolved { color: #28a745; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-content">
                <div class="logo">
                    <span class="logo-text">Thuật Toán Sắp Xếp - Admin</span>
                </div>
                <div class="user-info">
                    <span class="user-name">Xin chào, <?= htmlspecialchars($currentUser['fullname']) ?></span>
                    <a href="index.html" class="btn btn-secondary">Về Trang Chủ</a>
                    <button onclick="logout()" class="btn btn-secondary">Đăng Xuất</button>
                </div>
            </div>
        </div>
    </nav>

    <div class="admin-container">
        <div class="admin-header">
            <h1>Bảng Điều Khiển Quản Trị</h1>
            <p>Quản lý website Thuật Toán Sắp Xếp</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalUsers">0</div>
                <div>Tổng Người Dùng</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalContacts">0</div>
                <div>Tin Nhắn Liên Hệ</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalRuns">0</div>
                <div>Lượt Chạy Thuật Toán</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="newContacts">0</div>
                <div>Tin Nhắn Mới</div>
            </div>
        </div>

        <div class="data-table">
            <h2>Tin Nhắn Liên Hệ Mới</h2>
            <table id="contactsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Chủ Đề</th>
                        <th>Nội Dung</th>
                        <th>Trạng Thái</th>
                        <th>Ngày Gửi</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="data-table">
            <h2>Thống Kê Thuật Toán</h2>
            <table id="algorithmStatsTable">
                <thead>
                    <tr>
                        <th>Thuật Toán</th>
                        <th>Tổng Lượt Chạy</th>
                        <th>TB So Sánh</th>
                        <th>TB Hoán Đổi</th>
                        <th>Cập Nhật Cuối</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <script>
        // Load dữ liệu admin
        async function loadAdminData() {
            try {
                const response = await fetch('admin_handler.php');
                const data = await response.json();
                
                if (data.success) {
                    // Cập nhật thống kê
                    document.getElementById('totalUsers').textContent = data.stats.totalUsers;
                    document.getElementById('totalContacts').textContent = data.stats.totalContacts;
                    document.getElementById('totalRuns').textContent = data.stats.totalRuns;
                    document.getElementById('newContacts').textContent = data.stats.newContacts;
                    
                    // Load bảng liên hệ
                    loadContactsTable(data.contacts);
                    
                    // Load thống kê thuật toán
                    loadAlgorithmStats(data.algorithmStats);
                }
            } catch (error) {
                console.error('Lỗi load dữ liệu:', error);
            }
        }

        function loadContactsTable(contacts) {
            const tbody = document.querySelector('#contactsTable tbody');
            tbody.innerHTML = '';
            
            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.subject}</td>
                    <td>${contact.message.substring(0, 50)}...</td>
                    <td><span class="status-${contact.status}">${getStatusText(contact.status)}</span></td>
                    <td>${new Date(contact.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                        <button onclick="updateContactStatus(${contact.id}, 'resolved')" class="btn btn-primary">Đã Xử Lý</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function loadAlgorithmStats(stats) {
            const tbody = document.querySelector('#algorithmStatsTable tbody');
            tbody.innerHTML = '';
            
            stats.forEach(stat => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${getAlgorithmName(stat.algorithm_name)}</td>
                    <td>${stat.total_runs}</td>
                    <td>${parseFloat(stat.avg_comparisons).toFixed(1)}</td>
                    <td>${parseFloat(stat.avg_swaps).toFixed(1)}</td>
                    <td>${new Date(stat.updated_at).toLocaleDateString('vi-VN')}</td>
                `;
                tbody.appendChild(row);
            });
        }

        function getStatusText(status) {
            const statusMap = {
                'new': 'Mới',
                'processing': 'Đang xử lý',
                'resolved': 'Đã xử lý'
            };
            return statusMap[status] || status;
        }

        function getAlgorithmName(name) {
            const nameMap = {
                'bubble': 'Bubble Sort',
                'selection': 'Selection Sort',
                'insertion': 'Insertion Sort',
                'quick': 'Quick Sort',
                'merge': 'Merge Sort'
            };
            return nameMap[name] || name;
        }

        async function updateContactStatus(id, status) {
            try {
                const formData = new FormData();
                formData.append('action', 'updateContact');
                formData.append('id', id);
                formData.append('status', status);
                
                const response = await fetch('admin_handler.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (data.success) {
                    loadAdminData(); // Reload dữ liệu
                }
            } catch (error) {
                console.error('Lỗi cập nhật:', error);
            }
        }

        function logout() {
            const formData = new FormData();
            formData.append('action', 'logout');
            
            fetch('auth_handler.php', {
                method: 'POST',
                body: formData
            }).then(() => {
                window.location.href = 'login.html';
            });
        }

        // Load dữ liệu khi trang được tải
        document.addEventListener('DOMContentLoaded', loadAdminData);
    </script>
</body>
</html>