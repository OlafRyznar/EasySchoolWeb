<?php

namespace App\Models;

use PDO;

class Timetable
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Pobiera wszystkie wpisy z tabeli timetable
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM timetable");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //dla konkretnej klasy
    public function getByClass($classId)
    {
    $stmt = $this->pdo->prepare("SELECT * FROM timetable WHERE class_id = ?");
    $stmt->execute([$classId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
