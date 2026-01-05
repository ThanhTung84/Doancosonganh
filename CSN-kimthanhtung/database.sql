-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS sorting_algorithms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sorting_algorithms;

-- Bảng người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng liên hệ
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject ENUM('feedback', 'support', 'bug', 'other') NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'processing', 'resolved') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng lịch sử học tập
CREATE TABLE learning_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    algorithm_name VARCHAR(50) NOT NULL,
    array_size INT NOT NULL,
    comparisons INT NOT NULL,
    swaps INT NOT NULL,
    time_taken INT NOT NULL, -- thời gian tính bằng giây
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng thống kê thuật toán
CREATE TABLE algorithm_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    algorithm_name VARCHAR(50) NOT NULL,
    total_runs INT DEFAULT 0,
    avg_comparisons DECIMAL(10,2) DEFAULT 0,
    avg_swaps DECIMAL(10,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Chèn dữ liệu mẫu cho thống kê thuật toán
INSERT INTO algorithm_stats (algorithm_name) VALUES 
('bubble'), ('selection'), ('insertion'), ('quick'), ('merge');

-- Chèn người dùng admin mẫu (chạy test_password.php để tạo hash mới)
-- Tạm thời dùng mật khẩu đơn giản để test
INSERT INTO users (username, email, password, fullname) VALUES 
('tung', 'tung@admin.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQR', 'Tùng - Quản Trị Viên'),
('student', 'student@example.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQR', 'Sinh Viên');

-- QUAN TRỌNG: Chạy create_admin.php sau khi tạo database để có mật khẩu hash đúng!