<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

session_start();
session_unset(); 
session_destroy(); 

echo json_encode([
  'success' => true,
  'message' => 'Session destroyed'
]);
?>