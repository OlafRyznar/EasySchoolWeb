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

    // Pobierz wszystkie maile
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM mail");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Pobierz maila według ID
    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM mail WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Dodaj nowego maila
    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO mail (sender_id, receiver_id, subject, body, sent_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['sender_id'], $data['receiver_id'], $data['subject'], $data['body'], $data['sent_at']]);
        return $this->pdo->lastInsertId();
    }

    // Aktualizuj maila
    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare("UPDATE mail SET sender_id = ?, receiver_id = ?, subject = ?, body = ?, sent_at = ? WHERE id = ?");
        $stmt->execute([$data['sender_id'], $data['receiver_id'], $data['subject'], $data['body'], $data['sent_at'], $id]);
        return $stmt->rowCount() > 0;
    }

    // Usuń maila
    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM mail WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->rowCount() > 0;
    }
}