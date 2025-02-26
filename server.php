<?php
header("Content-Type: application/json");

// Path to XML file
$xmlFile = "data.xml";

// If the file doesn't exist, create an empty XML structure
if (!file_exists($xmlFile)) {
    $xml = new SimpleXMLElement('<data></data>');
    $xml->asXML($xmlFile);
}

// Handle POST request (adding data)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $link = $_POST['link'] ?? '';

    if ($name && $link) {
        $xml = simplexml_load_file($xmlFile);
        $entry = $xml->addChild('entry');
        $entry->addChild('name', htmlspecialchars($name));
        $entry->addChild('link', htmlspecialchars($link));
        $xml->asXML($xmlFile);
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
    exit;
}

// Handle GET request (retrieving data)
$xml = simplexml_load_file($xmlFile);
$data = [];

foreach ($xml->entry as $entry) {
    $data[] = [
        "name" => (string)$entry->name,
        "link" => (string)$entry->link
    ];
}

echo json_encode($data);
?>
