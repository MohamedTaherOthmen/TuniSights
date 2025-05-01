<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

// 1 for test purpose :
$tourist_id = $_SESSION['tourist_id'] ?? $_GET['tourist_id'] ?? null;

if (!$tourist_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Guide not authenticated'
    ]);
    exit;
}

try {
    $stmt = $connect->prepare("SELECT p.*, b.*, b.status as BStatus 
                                FROM tourists t
                                JOIN bookings b ON t.id = b.tourist_id 
                                JOIN plans p ON b.plan_id = p.id
                                WHERE t.id = :tourist_id");
    $stmt->bindParam(':tourist_id', $tourist_id);
    $stmt->execute();
    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'plans' => $plans
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
