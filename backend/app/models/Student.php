<?php

namespace App\Models;

use PDO;

class Student
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Get all students
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM student");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getByClassId($classId)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM student WHERE class_id = ?");
        $stmt->execute([$classId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // Add a new student
    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO student (first_name, last_name, `e-mail`, password, school, class_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['first_name'], $data['last_name'], $data['e-mail'], $data['password'], $data['school'], $data['class_id']]);
        return $this->pdo->lastInsertId();
    }
}
