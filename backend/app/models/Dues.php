<?php

namespace App\Models;

use PDO;

class Dues
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function getAllDues()
    {
        $stmt = $this->pdo->query("SELECT * FROM dues");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
   
    public function getByUserId($userId)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM dues WHERE user_id = ?");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
