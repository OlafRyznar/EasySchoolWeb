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
    public function createGrade(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        // Sprawdzenie, czy wymagane pola są obecne
        if (empty($data['student_id']) || empty($data['subject_id']) || empty($data['grade_value'])) {
            $response->getBody()->write(json_encode(['error' => 'Missing required fields']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Tworzenie nowej oceny
        $gradeId = $this->grade->create($data['student_id'], $data['subject_id'], $data['grade_value']);
        if ($gradeId) {
            $response->getBody()->write(json_encode(['message' => 'Grade created successfully', 'grade_id' => $gradeId]));
            return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
        } else {
            $response->getBody()->write(json_encode(['error' => 'Failed to create grade']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
}
