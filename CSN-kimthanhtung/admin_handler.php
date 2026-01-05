<?php
require_once 'config.php';

header('Content-Type: application/json');

// Kiểm tra quyền admin
if (!isLoggedIn() || $_SESSION['username'] !== 'tung') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Không có quyền truy cập']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'updateContact') {
        updateContactStatus();
    }
} else {
    getAdminData();
}

function getAdminData() {
    global $pdo;
    
    try {
        // Thống kê tổng quan
        $stats = [];
        
        // Tổng người dùng
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
        $stats['totalUsers'] = $stmt->fetch()['count'];
        
        // Tổng tin nhắn liên hệ
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM contacts");
        $stats['totalContacts'] = $stmt->fetch()['count'];
        
        // Tổng lượt chạy thuật toán
        $stmt = $pdo->query("SELECT SUM(total_runs) as count FROM algorithm_stats");
        $stats['totalRuns'] = $stmt->fetch()['count'] ?? 0;
        
        // Tin nhắn mới
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'");
        $stats['newContacts'] = $stmt->fetch()['count'];
        
        // Danh sách tin nhắn liên hệ
        $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 20");
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Thống kê thuật toán
        $stmt = $pdo->query("SELECT * FROM algorithm_stats ORDER BY algorithm_name");
        $algorithmStats = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'stats' => $stats,
            'contacts' => $contacts,
            'algorithmStats' => $algorithmStats
        ]);
        
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống']);
    }
}

function updateContactStatus() {
    global $pdo;
    
    $id = intval($_POST['id'] ?? 0);
    $status = sanitize($_POST['status'] ?? '');
    
    $allowedStatuses = ['new', 'processing', 'resolved'];
    if (!in_array($status, $allowedStatuses)) {
        echo json_encode(['success' => false, 'message' => 'Trạng thái không hợp lệ']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE contacts SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        
        echo json_encode(['success' => true, 'message' => 'Cập nhật thành công']);
        
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống']);
    }
}
?>