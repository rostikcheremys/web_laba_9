<?php
header('Content-Type: application/json');

$ip = $_POST['ip'];
$json_url = "http://ip-api.com/json/{$ip}";

$response = file_get_contents($json_url);
$json_data = json_decode($response, true);

if (isset($json_data['status']) && $json_data['status'] == 'fail') {
    echo json_encode(['error' => $json_data['message']]);
} else {
    echo json_encode($json_data);
}
?>
