<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$input = json_decode(file_get_contents('php://input'), true);

$id_plan = $input['id_plan'] ?? null;

if (!$id_plan) {
    echo json_encode([
        'success' => false,
        'message' => 'Plan ID missing'
    ]);
    exit;
}

try {
    $sql = "UPDATE plans 
            SET plan_name = :title, 
                description = :description, 
                price = :price, 
                duration = :duration, 
                image_url = :image, 
                status = :status 
            WHERE id = :plan_id";

    $stmt = $connect->prepare($sql);
    $stmt->bindParam(':title', $input['title']);
    $stmt->bindParam(':description', $input['description']);
    $stmt->bindParam(':price', $input['price']);
    $stmt->bindParam(':duration', $input['duration']);
    $stmt->bindParam(':image', $input['image']);
    $stmt->bindParam(':status', $input['status']);
    $stmt->bindParam(':plan_id', $id_plan);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Plan updated successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Update failed'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>