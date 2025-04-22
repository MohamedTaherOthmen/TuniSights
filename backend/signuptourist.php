<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !$data || 
    !$data->first_name || 
    !$data->last_name || 
    !$data->email || 
    !$data->phone_number || 
    !$data->country || 
    !$data->password
) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required.'
    ]);
    exit;
}

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$phone_number = $data->phone_number;
$country = $data->country;
$password = $data->password;

try {
    $checkEmailSql = "SELECT * FROM tourists WHERE email = :email";
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

    $sql = "INSERT INTO tourists 
        (first_name, last_name, email, phone_number, country, password_hash)
        VALUES 
        (:first_name, :last_name, :email, :phone_number, :country, :password_hash)";
    
    $stmt = $connect->prepare($sql);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':country', $country);
    $stmt->bindParam(':password_hash', $password);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Tourist account created successfully.'
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
