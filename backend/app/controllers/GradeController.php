<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Grade;

class GradeController
{
    private $grade;

    public function __construct(Grade $grade)
    {
        $this->grade = $grade;
    }

    // Pobieranie wszystkich ocen
    public function getAllGrades(Request $request, Response $response): Response
    {
        $grades = $this->grade->getAll();
        $response->getBody()->write(json_encode($grades));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Pobieranie ocen dla konkretnego ucznia
    public function getGradesByStudent(Request $request, Response $response): Response
    {
        $studentId = $request->getAttribute('student_id');
        if (!$studentId) {
            $response->getBody()->write(json_encode(['error' => 'Student ID is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $grades = $this->grade->getByStudent($studentId);
        if (empty($grades)) {
            $response->getBody()->write(json_encode(['message' => 'No grades found for this student.']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($grades));
        return $response->withHeader('Content-Type', 'application/json');
    }

   // Dodawanie nowej oceny
   public function createGrade(Request $request, Response $response, array $args = []): Response
   {
       // Odczytanie danych z żądania
       $data = json_decode($request->getBody()->getContents(), true);

       // Tworzenie nowej oceny
       $gradeId = $this->grade->create($data);

       // Odpowiedź z nowo utworzonym ID
       $response->getBody()->write(json_encode(['id' => $gradeId]));
       return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
   }
}
