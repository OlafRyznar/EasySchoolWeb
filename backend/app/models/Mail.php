<?php

namespace App\Models;

use PDO;

class Mail
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Pobiera wszystkie rekordy z tabeli mail
    public function getAllMails()
    {
        $stmt = $this->pdo->query("SELECT * FROM mail");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
