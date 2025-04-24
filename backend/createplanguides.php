<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$data = json_decode(file_get_contents("php://input"), true);

// Validate that all required fields are present
if (
    !$data || 
    !isset($data['title']) || 
    !isset($data['description']) || 
    !isset($data['price']) || 
    !isset($data['duration']) || 
    !isset($data['image']) || 
    !isset($data['status']) || 
    !isset($data['guide_id'])
) {
    echo json_encode([
        'success' => false,
        'message' => "Please fill all the fields!"
    ]);
    exit;
}

// Extract data
$title = $data['title'];
$description = $data['description'];
$price = $data['price'];
$duration = $data['duration'];
$image = $data['image'];
$status = $data['status'];
$id = $data['guide_id'];

try {
    $sql = "INSERT INTO plans (plan_name, description, price, duration, image_url, status, guide_id)
            VALUES (:title, :description, :price, :duration, :image, :status, :id_guide)";
    
    $stmt = $connect->prepare($sql);

    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':duration', $duration);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':id_guide', $id);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Plan created successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error while creating the plan.'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
