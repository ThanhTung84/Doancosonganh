<?php
require_once 'config.php';

echo "<h2>Debug Đăng Nhập</h2>";

if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    echo "<p><strong>Username nhập:</strong> " . htmlspecialchars($username) . "</p>";
    echo "<p><strong>Password nhập:</strong> " . htmlspecialchars($password) . "</p>";
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            echo "<p style='color: green;'>✓ Tìm thấy user trong database</p>";
            echo "<p><strong>Username DB:</strong> " . $user['username'] . "</p>";
            echo "<p><strong>Email DB:</strong> " . $user['email'] . "</p>";
            echo "<p><strong>Password Hash DB:</strong> " . $user['password'] . "</p>";
            
            if (password_verify($password, $user['password'])) {
                echo "<p style='color: green;'>✓ Mật khẩu đúng!</p>";
                echo "<p>Đăng nhập thành công với user: " . $user['fullname'] . "</p>";
            } else {
                echo "<p style='color: red;'>✗ Mật khẩu sai!</p>";
                
                // Test với các mật khẩu khác
                $testPasswords = ['tung', 'password', '123456'];
                foreach ($testPasswords as $testPass) {
                    if (password_verify($testPass, $user['password'])) {
                        echo "<p style='color: orange;'>Mật khẩu đúng là: <strong>$testPass</strong></p>";
                        break;
                    }
                }
            }
        } else {
            echo "<p style='color: red;'>✗ Không tìm thấy user trong database</p>";
            
            // Hiển thị tất cả users
            $stmt = $pdo->query("SELECT username, email, fullname FROM users");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo "<p><strong>Danh sách users trong DB:</strong></p>";
            foreach ($users as $u) {
                echo "<p>- " . $u['username'] . " (" . $u['email'] . ") - " . $u['fullname'] . "</p>";
            }
        }
    } catch (PDOException $e) {
        echo "<p style='color: red;'>Lỗi database: " . $e->getMessage() . "</p>";
    }
}
?>

<form method="POST">
    <h3>Test Đăng Nhập</h3>
    <p>
        <label>Username:</label><br>
        <input type="text" name="username" value="tung" required>
    </p>
    <p>
        <label>Password:</label><br>
        <input type="text" name="password" value="tung" required>
    </p>
    <p>
        <button type="submit">Test Đăng Nhập</button>
    </p>
</form>

<hr>
<p><a href="create_admin.php">Tạo lại tài khoản admin</a></p>