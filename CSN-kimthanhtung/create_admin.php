<?php
// Script tạo tài khoản admin với mật khẩu đã hash
require_once 'config.php';

echo "<h2>Tạo Tài Khoản Admin</h2>";

// Tạo mật khẩu hash cho "tung"
$password = 'tung';
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

echo "<p><strong>Mật khẩu hash cho 'tung':</strong> " . $hashedPassword . "</p>";

// Tạo mật khẩu hash cho "password" (student)
$passwordStudent = 'password';
$hashedPasswordStudent = password_hash($passwordStudent, PASSWORD_DEFAULT);

echo "<p><strong>Mật khẩu hash cho 'password':</strong> " . $hashedPasswordStudent . "</p>";

try {
    // Xóa tài khoản cũ nếu có
    $stmt = $pdo->prepare("DELETE FROM users WHERE username IN ('tung', 'student')");
    $stmt->execute();
    
    // Tạo tài khoản admin
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, fullname) VALUES (?, ?, ?, ?)");
    $stmt->execute(['tung', 'tung@admin.com', $hashedPassword, 'Tùng - Quản Trị Viên']);
    echo "<p style='color: green;'>✓ Đã tạo tài khoản admin 'tung' thành công</p>";
    
    // Tạo tài khoản student
    $stmt->execute(['student', 'student@example.com', $hashedPasswordStudent, 'Sinh Viên']);
    echo "<p style='color: green;'>✓ Đã tạo tài khoản 'student' thành công</p>";
    
    echo "<hr>";
    echo "<h3>Thông Tin Đăng Nhập:</h3>";
    echo "<p><strong>Admin:</strong> Username: <code>tung</code> | Password: <code>tung</code></p>";
    echo "<p><strong>Student:</strong> Username: <code>student</code> | Password: <code>password</code></p>";
    echo "<p>Bạn có thể đăng nhập với thông tin này.</p>";
    
    // Test verify
    if (password_verify('tung', $hashedPassword)) {
        echo "<p style='color: green;'>✓ Test verify mật khẩu admin thành công</p>";
    } else {
        echo "<p style='color: red;'>✗ Test verify mật khẩu admin thất bại</p>";
    }
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>Lỗi: " . $e->getMessage() . "</p>";
}
?>