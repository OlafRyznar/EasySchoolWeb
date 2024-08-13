<?php

namespace App\Models;

use PDO;

class UserModel
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Metoda do pobierania wszystkich użytkowników
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
