<?php

namespace App\Models;

use PDO;

class Guardian
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Get all guardians
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM guardian");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Add a new guardian
    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO guardian(first_name, last_name, `e-mail`, password, student_id) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['first_name'],
            $data['last_name'],
            $data['e-mail'],
            $data['password'],
            $data['student_id']
        ]);
        return $this->pdo->lastInsertId();
    }
}
