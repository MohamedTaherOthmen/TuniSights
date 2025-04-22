<?php 
    require './config.php';
    try {
        $connect = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>