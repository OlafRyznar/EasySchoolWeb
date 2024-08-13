<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\StudentSubject;

class StudentSubjectController
{
    private $studentSubject;

    public function __construct(StudentSubject $studentSubject)
    {
        $this->studentSubject = $studentSubject;
    }

    // Pobieranie przedmiotów dla konkretnego ucznia
    public function getSubjectsByStudent(Request $request, Response $response): Response
    {
        // Pobieranie student_id z atrybutów żądania
        $studentId = $request->getAttribute('student_id');
        
        // Sprawdzanie, czy student_id jest podany
        if (!$studentId) {
            $response->getBody()->write(json_encode(['error' => 'Student ID is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }
        
        // Pobieranie przedmiotów z modelu
        $subjects = $this->studentSubject->getByStudent($studentId);
        
        // Sprawdzanie, czy znaleziono przedmioty
        if (empty($subjects)) {
            $response->getBody()->write(json_encode(['message' => 'No subjects found for this student.']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        
        // Zwracanie wyników w formacie JSON
        $response->getBody()->write(json_encode($subjects));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
