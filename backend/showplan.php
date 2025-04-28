<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';
session_start();


$id_plan = $_GET['id_plan'] ?? null;

if (!$id_plan) {
    echo json_encode([
        'success' => false,
        'message' => 'This is not edit plan instruction'
    ]);
    exit;
}

try {
    $stmt = $connect->prepare("SELECT * FROM plans WHERE id = :plan_id");
    $stmt->bindParam(':plan_id', $id_plan);
    $stmt->execute();
    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'message' => "plan_id = $id_plan data is fetched succefully",
        'plans' => $plans
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
