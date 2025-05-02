<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$input = json_decode(file_get_contents('php://input'), true);

session_start();
// ... ?? 1 for test purposes :
$guide_id = $_SESSION['guide_id'] ?? $_GET['guide_id'] ?? null;


if (!$guide_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Guide not authenticated'
    ]);
    exit;
}

try{
    $stmt = $connect->prepare("UPDATE guides 
                                SET first_name = :first_name,
                                    last_name = :last_name,
                                    email = :email, 
                                    phone_number = :phone_number, 
                                    city = :city, 
                                    language_spoken = :language_spoken, 
                                    bio = :bio,
                                    experience_years = :experience_years,
                                    profile_picture_url = :profile_picture_url,
                                    password_hash = :password_hash
                                WHERE id = :guide_id");
    $stmt->bindParam(':first_name', $input['first_name']);
    $stmt->bindParam(':last_name', $input['last_name']);
    $stmt->bindParam(':email', $input['email']);
    $stmt->bindParam(':phone_number', $input['phone_number']);
    $stmt->bindParam(':city', $input['city']);
    $stmt->bindParam(':language_spoken', $input['language_spoken']);
    $stmt->bindParam(':bio', $input['bio']);
    $stmt->bindParam(':experience_years', $input['experience_years']);
    $stmt->bindParam(':profile_picture_url', $input['profile_picture_url']);
    $stmt->bindParam(':password_hash', $input['password']);
    $stmt->bindParam(':guide_id', $guide_id);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Guide Infos updated successfully.'
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