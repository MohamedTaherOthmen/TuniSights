<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$guide_id = $_SESSION['guide_id'] ?? $_GET['guide_id'] ?? null;

if (!$guide_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Guide not authenticated'
    ]);
    exit;
}

try {
    $stmt = $connect->prepare("SELECT p.*, b.*, b.status as BStatus 
                                FROM guides g
                                JOIN plans p ON g.id = p.guide_id
                                JOIN bookings b ON b.plan_id = p.id
                                WHERE g.id = :guide_id");
    $stmt->bindParam(':guide_id', $guide_id);
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
