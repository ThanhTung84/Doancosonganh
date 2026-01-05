<?php
// Test tạo mật khẩu hash đúng
$password = 'tung';
$hash = password_hash($password, PASSWORD_DEFAULT);

echo "Mật khẩu: " . $password . "\n";
echo "Hash: " . $hash . "\n";

// Test verify
if (password_verify($password, $hash)) {
    echo "Verify thành công!\n";
} else {
    echo "Verify thất bại!\n";
}

// Tạo hash cho password "password" để test
$password2 = 'password';
$hash2 = password_hash($password2, PASSWORD_DEFAULT);
echo "\nMật khẩu student: " . $password2 . "\n";
echo "Hash student: " . $hash2 . "\n";
?>