<?php

namespace App\Models;

use PDO;

class Book
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Pobierz wszystkie książki
    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM book");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Pobierz książkę według ID
    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM book WHERE book_id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Dodaj nową książkę
    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO book (title, author, is_borrowed, student_id) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['author'], $data['is_borrowed'], $data['student_id']]);
        return $this->pdo->lastInsertId();
    }

    // Aktualizuj książkę
    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare("UPDATE book SET title = ?, author = ?, is_borrowed = ?, student_id = ? WHERE book_id = ?");
        $stmt->execute([$data['title'], $data['author'], $data['is_borrowed'], $data['student_id'], $id]);
        return $stmt->rowCount() > 0;
    }

    // Usuń książkę
    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM book WHERE book_id = ?");
        $stmt->execute([$id]);
        return $stmt->rowCount() > 0;
    }
}
