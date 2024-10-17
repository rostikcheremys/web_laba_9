<?php
$ip = $_POST['ip'];
$xml_url = "http://ip-api.com/xml/{$ip}";

$response = simplexml_load_file($xml_url);
$xml_data = json_decode(json_encode($response), true);

if (isset($xml_data['status']) && $xml_data['status'] == 'fail') {
    echo json_encode(['error' => $xml_data['message']]);
} else {
    echo json_encode($xml_data);
}