<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    !$data || 
    !isset($data['plan_id']) || 
    !isset($data['tourist_id']) || 
    !isset($data['dates']) || 
    !isset($data['participants']) || 
    !isset($data['status'])
) {
    echo json_encode([
        'success' => false,
        'message' => "Please fill all the required fields!"
    ]);
    exit;
}

// Extract data
$plan_id = $data['plan_id'];
$tourist_id = $data['tourist_id'];
$tour_date = $data['dates'];
$participants = $data['participants'];
$status = $data['status'];
$notes = isset($data['notes']) ? $data['notes'] : null;

try {   
    $sql = "SELECT * FROM plans WHERE id = :plan_id";
    $stmt = $connect->prepare($sql);
    $stmt->bindParam(':plan_id', $plan_id);
    $stmt->execute();
    $plan = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($plan) {
        $guide_id = $plan['guide_id'];
    } else {
        echo json_encode([
            'success' => false,
            'message' => "Couldn't get guide id"
        ]);
    }

    $sql = "INSERT INTO bookings (plan_id, tourist_id, guide_id, tour_date, participants, status, notes)
            VALUES (:plan_id, :tourist_id, :guide_id, :tour_date, :participants, :status, :notes)";
    
    $stmt = $connect->prepare($sql);

    $stmt->bindParam(':plan_id', $plan_id);
    $stmt->bindParam(':tourist_id', $tourist_id);
    $stmt->bindParam(':guide_id', $guide_id);
    $stmt->bindParam(':tour_date', $tour_date);
    $stmt->bindParam(':participants', $participants);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':notes', $notes);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Plan reserved successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error while reserving the plan.'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}

?>