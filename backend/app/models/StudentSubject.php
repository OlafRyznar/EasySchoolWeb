<?php

namespace App\Models;

use PDO;

class StudentSubject
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Pobieranie nazw przedmiotów oraz ich identyfikatorów dla konkretnego ucznia
    public function getByStudent($studentId)
    {
        $stmt = $this->pdo->prepare("
            SELECT s.subject_id, s.name
            FROM subject s
            JOIN student_subject ss ON s.subject_id = ss.subject_id
            WHERE ss.student_id = ?
        ");
        $stmt->execute([$studentId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
