<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !$data->email || !$data->password){
    echo json_encode([
        'success' => false,
        'error' => "Email and password are required"
    ]);
    exit;
}

$email = $data->email;
$password = $data->password;

try {
    // Check in tourists table
    $sqltourist = "SELECT * FROM tourists WHERE email = :email";
    $stmttourist = $connect->prepare($sqltourist);
    $stmttourist->bindParam(':email', $email);
    $stmttourist->execute();
    $usertourist = $stmttourist->fetch(PDO::FETCH_ASSOC);

    // Check in guides table
    $sqlguide = "SELECT * FROM guides WHERE email = :email";
    $stmtguide = $connect->prepare($sqlguide);
    $stmtguide->bindParam(':email', $email);
    $stmtguide->execute();
    $userguide = $stmtguide->fetch(PDO::FETCH_ASSOC);

    $user = null;
    $user_type = null;

    if ($usertourist) {
        $user = $usertourist;
        $user_type = 'tourist';
    } elseif ($userguide) {
        $user = $userguide;
        $user_type = 'guide';
    }

    if ($user && $password == $user['password_hash']) {
        $_SESSION['id'] = $user['id'];
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'email' => $user['email'],
                'id' => $user['id'],
                'type' => $user_type,
                'name' => $user['first_name'],
                'user_img_url' => $user['profile_picture_url']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Incorrect email or password. Please try again.'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
