<?php

namespace App\Models;

use PDO;

class Teacher
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Get all teachers
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM teacher");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Add a new teacher
    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO teacher(first_name, last_name, `e-mail`, password, school, class_teacher_of) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['first_name'], $data['last_name'], $data['e-mail'], $data['password'], $data['school'], $data['class_teacher_of']]);
        return $this->pdo->lastInsertId();
    }
}
