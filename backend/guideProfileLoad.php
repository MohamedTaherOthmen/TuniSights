<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';
session_start();

// 1 for test purposes :
$guide_id = $_SESSION['guide_id'] ?? $_GET['guide_id'] ?? 1;

if (!$guide_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Guide not authenticated'
    ]);
    exit;
}

try {
    $stmt = $connect->prepare("SELECT * FROM guides WHERE id = :guide_id");
    $stmt->bindParam(':guide_id', $guide_id);
    $stmt->execute();
    $infos = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'infos' => $infos
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}



?>