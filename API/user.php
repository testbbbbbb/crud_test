<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM users");
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->name;
        $email = $data->email;
        $password = $data->password;
        $dob = $data->dob;

        $stmt = $conn->prepare("INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email,  $password, $dob);
        $stmt->execute();

        echo json_encode(["message" => "User created successfully"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        $name = $data->name;
        $email = $data->email;
        $dob = $data->dob;
        $password = $data->password;

        $stmt = $conn->prepare("UPDATE users SET name=?, email=?, dob=?, password=? WHERE id=?");
        $stmt->bind_param("ssssi", $name, $email, $dob, $password, $id);
        $stmt->execute();

        echo json_encode(["message" => "User updated successfully"]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;

        $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(["message" => "User deleted successfully"]);
        break;

    default:
        echo json_encode(["message" => "Invalid Request"]);
        break;
}
?>
