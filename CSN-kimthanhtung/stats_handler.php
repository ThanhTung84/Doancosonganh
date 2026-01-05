<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lưu kết quả học tập
    saveResult();
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lấy thống kê
    getStats();
}

function saveResult() {
    global $pdo;
    
    $algorithm = sanitize($_POST['algorithm'] ?? '');
    $arraySize = intval($_POST['arraySize'] ?? 0);
    $comparisons = intval($_POST['comparisons'] ?? 0);
    $swaps = intval($_POST['swaps'] ?? 0);
    $timeTaken = intval($_POST['timeTaken'] ?? 0);
    
    if (empty($algorithm) || $arraySize <= 0) {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
        return;
    }
    
    try {
        // Lưu lịch sử học tập (nếu user đã đăng nhập)
        if (isLoggedIn()) {
            $stmt = $pdo->prepare("INSERT INTO learning_history (user_id, algorithm_name, array_size, comparisons, swaps, time_taken) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$_SESSION['user_id'], $algorithm, $arraySize, $comparisons, $swaps, $timeTaken]);
        }
        
        // Cập nhật thống kê tổng
        $stmt = $pdo->prepare("UPDATE algorithm_stats SET total_runs = total_runs + 1 WHERE algorithm_name = ?");
        $stmt->execute([$algorithm]);
        
        // Tính toán lại trung bình
        $stmt = $pdo->prepare("
            UPDATE algorithm_stats 
            SET avg_comparisons = (
                SELECT AVG(comparisons) FROM learning_history WHERE algorithm_name = ?
            ),
            avg_swaps = (
                SELECT AVG(swaps) FROM learning_history WHERE algorithm_name = ?
            )
            WHERE algorithm_name = ?
        ");
        $stmt->execute([$algorithm, $algorithm, $algorithm]);
        
        echo json_encode(['success' => true, 'message' => 'Lưu kết quả thành công']);
        
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống']);
    }
}

function getStats() {
    global $pdo;
    
    try {
        // Thống kê tổng
        $stmt = $pdo->query("SELECT * FROM algorithm_stats ORDER BY algorithm_name");
        $algorithmStats = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Thống kê cá nhân (nếu đã đăng nhập)
        $personalStats = [];
        if (isLoggedIn()) {
            $stmt = $pdo->prepare("
                SELECT 
                    algorithm_name,
                    COUNT(*) as runs,
                    AVG(comparisons) as avg_comparisons,
                    AVG(swaps) as avg_swaps,
                    MIN(time_taken) as best_time
                FROM learning_history 
                WHERE user_id = ? 
                GROUP BY algorithm_name
            ");
            $stmt->execute([$_SESSION['user_id']]);
            $personalStats = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode([
            'success' => true,
            'algorithmStats' => $algorithmStats,
            'personalStats' => $personalStats,
            'isLoggedIn' => isLoggedIn()
        ]);
        
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống']);
    }
}
?>