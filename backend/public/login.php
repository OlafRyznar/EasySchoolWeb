<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Połączenie z bazą danych
require_once 'db_connection.php';

// Funkcja do haszowania haseł
function hashPassword($password) {
    return hash('sha256', $password);
}

// Odczyt danych z żądania
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Debug: Wypisz dane wejściowe
file_put_contents('php://stderr', "Received email: $email\n");
file_put_contents('php://stderr', "Received password: $password\n");

// Haszowanie wprowadzonego hasła
$hashedPassword = hashPassword($password);

// Debug: Wypisz haszowane hasło
file_put_contents('php://stderr', "Hashed password: $hashedPassword\n");

// Przygotowanie zapytania do bazy danych
$stmt = $pdo->prepare('SELECT id, role FROM users WHERE email = ? AND password = ?');
$stmt->execute([$email, $hashedPassword]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Debug: Wypisz wyniki zapytania
file_put_contents('php://stderr', "Query result: " . print_r($user, true) . "\n");

if ($user) {
    echo json_encode([
        'success' => true,
        'role' => $user['role'],
        'user_id' => $user['id']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid login credentials']);
}
?>
