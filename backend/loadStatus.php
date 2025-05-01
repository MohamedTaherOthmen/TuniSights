<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require './connection.php';

// guide_id = 1 For Test
$guide_id = $_SESSION['guide_id'] ?? $_GET['guide_id'] ?? 1;

if (!$guide_id) {
    echo json_encode([
        'success' => false,
        'message' => 'Guide not authenticated'
    ]);
    exit;
}

try {
    $stmt = $connect->prepare("SELECT COUNT(b.id) as TotalBookings,
                                SUM(b.participants * p.price) as TotalEarnings
                                FROM bookings b JOIN plans p ON b.plan_id = p.id
                                WHERE b.guide_id = :guide_id");

    $stmt->bindParam(':guide_id', $guide_id);
    $stmt->execute();
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt_upCommingTours = $connect->prepare("SELECT COUNT(*) AS UpcomingTours
                                                FROM bookings b JOIN plans p ON b.plan_id = p.id
                                                WHERE b.guide_id = :guide_id AND b.tour_date >= CURDATE()");
    
    $stmt_upCommingTours->bindParam(':guide_id', $guide_id);   
    $stmt_upCommingTours->execute();
    $upCommingTours = $stmt_upCommingTours->fetch(PDO::FETCH_ASSOC);

    $stmt_startsTomorrowTours = $connect->prepare(" SELECT COUNT(*) AS bookings_tomorrow
                                                    FROM bookings
                                                    WHERE tour_date = CURDATE() + INTERVAL 1 DAY
                                                    AND guide_id = :guide_id");
    
    $stmt_startsTomorrowTours->bindParam(':guide_id', $guide_id);   
    $stmt_startsTomorrowTours->execute();
    $tomorrowTours = $stmt_startsTomorrowTours->fetch(PDO::FETCH_ASSOC);

    $stmt_thisWeek = $connect->prepare(" SELECT COUNT(*) AS bookings_this_week
                                        FROM bookings
                                        WHERE booking_date BETWEEN DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND CURDATE() + INTERVAL 1 DAY               
                                        AND guide_id = :guide_id");

    $stmt_thisWeek->bindParam(':guide_id', $guide_id);   
    $stmt_thisWeek->execute();
    $thisWeek = $stmt_thisWeek->fetch(PDO::FETCH_ASSOC);

    $stmt_currLastEarnings = $connect->prepare("SELECT 
                                                    SUM(CASE 
                                                            WHEN MONTH(b.booking_date) = MONTH(CURDATE()) 
                                                            AND YEAR(b.booking_date) = YEAR(CURDATE())
                                                        THEN b.participants * p.price 
                                                        ELSE 0 END) AS current_month_earnings,
                                                    SUM(CASE 
                                                            WHEN MONTH(b.booking_date) = MONTH(CURDATE() - INTERVAL 1 MONTH)
                                                            AND YEAR(b.booking_date) = YEAR(CURDATE() - INTERVAL 1 MONTH)
                                                        THEN b.participants * p.price 
                                                        ELSE 0 END) AS last_month_earnings
                                                FROM bookings b JOIN plans p ON b.plan_id = p.id
                                                WHERE b.guide_id = :guide_id");

    $stmt_currLastEarnings->bindParam(':guide_id', $guide_id);   
    $stmt_currLastEarnings->execute();
    $currLastEarnings = $stmt_currLastEarnings->fetch(PDO::FETCH_ASSOC);
    $current = (float)$currLastEarnings['current_month_earnings'];
    $last = (float)$currLastEarnings['last_month_earnings'];  
    $growth_percentage = 0;
    if ($last > 0) {
        $growth_percentage = number_format((($current - $last) / $last) * 100, 2, '.', '');
    }

    echo json_encode([
        'success' => true,
        'stats' => $stats,
        'upComing' => $upCommingTours,
        'tomorrowTours' => $tomorrowTours,
        'thisWeek' => $thisWeek,
        'growth_percentage' => $growth_percentage
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
