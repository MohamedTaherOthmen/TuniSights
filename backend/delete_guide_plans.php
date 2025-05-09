<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode([
        'success' => false,
        'message' => "Missing plan ID"
    ]);
    exit;
}

$plan_id = $data['id'];

try {
    $stmtTestPlans = $connect->prepare("SELECT * FROM bookings WHERE id = :plan_id");
    $stmtTestPlans->bindParam(':plan_id', $plan_id, PDO::PARAM_INT);
    $stmtTestPlans->execute();

    if ($stmtTestPlans->rowCount() > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Booking already exists for this plan. You can not delete this plan.',
            'errorType' => true
        ]);
        exit;
    }
    
    $stmt = $connect->prepare("DELETE FROM plans WHERE id = :plan_id");
    $stmt->bindParam(':plan_id', $plan_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Plan deleted']);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to delete plan'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'DB error: ' . $e->getMessage()
    ]);
}