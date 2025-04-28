<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !$data || 
    !$data->title || 
    !$data->description || 
    !$data->price || 
    !$data->duration ||
    !$data->image || 
    !$data->status 
) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required.'
    ]);
    exit;
}

$title = $data->title;
$description = $data->description; 
$price = $data->price; 
$duration = $data->duration;
$image = $data->image; 
$status = $data->status;

//$password_hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $checkEmailSql = "SELECT * FROM guides WHERE email = :email";
    $checkStmt = $connect->prepare($checkEmailSql);
    $checkStmt->bindParam(':email', $email);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Email already exists.'
        ]);
        exit;
    }

    $sql = "INSERT INTO guides 
        (first_name, last_name, email, phone_number, city, language_spoken, bio, experience_years, profile_picture_url, password_hash)
        VALUES 
        (:first_name, :last_name, :email, :phone_number, :city, :language, :bio, :experience_years, :profile_picture_url, :password_hash)";
    
    $stmt = $connect->prepare($sql);
    
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':language', $language);
    $stmt->bindParam(':bio', $bio);
    $stmt->bindParam(':experience_years', $experience_years);
    $stmt->bindParam(':profile_picture_url', $profile_picture_url);
    $stmt->bindParam(':password_hash', $password);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Guide account created successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error while creating account.'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
