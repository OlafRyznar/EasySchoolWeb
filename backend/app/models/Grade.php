<?php

namespace App\Models;

use PDO;

class Grade
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Pobieranie wszystkich ocen
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM grade");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Pobieranie ocen dla konkretnego ucznia
    public function getByStudent($studentId)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM grade WHERE student_id = ?");
        $stmt->execute([$studentId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Dodawanie nowej oceny
    public function create($studentId, $subjectId, $gradeValue)
    {
        $stmt = $this->pdo->prepare("INSERT INTO grade (student_id, subject_id, grade_value) VALUES (?, ?, ?)");
        $stmt->execute([$studentId, $subjectId, $gradeValue]);

        // Sprawdzenie, czy operacja się powiodła
        if ($stmt->rowCount() > 0) {
            return $this->pdo->lastInsertId();
        }
        return false;
    }
}
