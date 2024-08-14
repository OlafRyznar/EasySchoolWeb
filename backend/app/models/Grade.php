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
    public function create(array $data)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO grade (student_id, subject_id, grade_value, added_by, exam_id, description, date_added)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");

        $stmt->execute([
            $data['student_id'],
            $data['subject_id'],
            $data['grade_value'],
            $data['added_by'] ?? null,
            $data['exam_id'] ?? null,
            $data['description'] ?? null
        ]);

        // Sprawdzenie, czy operacja się powiodła
        if ($stmt->rowCount() > 0) {
            return $this->pdo->lastInsertId();
        }
        return false;
    }
}
