<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Book;

class BookController
{
    private $book;

    public function __construct(Book $book)
    {
        $this->book = $book;
    }

    // Pobierz wszystkie książki
    public function getAllBooks(Request $request, Response $response, array $args = []): Response
    {
        $books = $this->book->getAll();
        $response->getBody()->write(json_encode($books));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Pobierz książkę według ID
    public function getBookById(Request $request, Response $response, array $args = []): Response
    {
        $bookId = (int) $args['id'];
        $book = $this->book->getById($bookId);
        if ($book) {
            $response->getBody()->write(json_encode($book));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404, 'Book not found');
    }

    // Dodaj nową książkę
    public function createBook(Request $request, Response $response, array $args = []): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        $bookId = $this->book->create($data);
        $response->getBody()->write(json_encode(['book_id' => $bookId]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    // Aktualizuj książkę
    public function updateBook(Request $request, Response $response, array $args = []): Response
    {
        $bookId = (int) $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $updated = $this->book->update($bookId, $data);
        if ($updated) {
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404, 'Book not found');
    }

    // Usuń książkę
    public function deleteBook(Request $request, Response $response, array $args = []): Response
    {
        if (isset($args['id'])) {
            $bookId = (int) $args['id'];
            $deleted = $this->book->delete($bookId);
            if ($deleted) {
                return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
            }
            return $response->withStatus(404, 'Book not found');
        }
    
        return $response->withStatus(400, 'Invalid request: ID not provided');
    }
    
}
