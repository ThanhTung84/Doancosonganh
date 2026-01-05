<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Phương thức không được phép']);
    exit();
}

$name = sanitize($_POST['name'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$subject = sanitize($_POST['subject'] ?? '');
$message = sanitize($_POST['message'] ?? '');

// Validate dữ liệu
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng nhập đầy đủ thông tin']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email không hợp lệ']);
    exit();
}

$allowedSubjects = ['feedback', 'support', 'bug', 'other'];
if (!in_array($subject, $allowedSubjects)) {
    echo json_encode(['success' => false, 'message' => 'Chủ đề không hợp lệ']);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $subject, $message]);
    
    // Gửi email thông báo (tùy chọn)
    $to = "makara1999.tv@gmail.com";
    $emailSubject = "Liên hệ mới từ website Thuật Toán Sắp Xếp";
    $emailMessage = "
    Tên: $name
    Email: $email
    Chủ đề: $subject
    Nội dung: $message
    ";
    
    // Uncomment dòng dưới để gửi email
    // mail($to, $emailSubject, $emailMessage);
    
    echo json_encode(['success' => true, 'message' => 'Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.']);
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống, vui lòng thử lại sau']);
}
?>