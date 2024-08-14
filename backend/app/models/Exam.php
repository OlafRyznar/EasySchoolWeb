<?php

namespace App\Models;

use PDO;

class Exam
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM exam");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByUserId($userId)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM exam WHERE user_id = ?");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function create(array $data)
{
    // Prepare the SQL statement
    $stmt = $this->pdo->prepare("
        INSERT INTO exam (subject_id, added_by, name, description, date, score, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    // Execute the SQL statement with data from the request
    $stmt->execute([
        $data['subject_id'],
        $data['added_by'],
        $data['name'],
        $data['description'] ?? null, // Optional field
        $data['date'],
        $data['score'],
        $data['user_id']
    ]);

    // Return the last inserted ID if successful
    if ($stmt->rowCount() > 0) {
        return $this->pdo->lastInsertId();
    }
    return false;
}
}
