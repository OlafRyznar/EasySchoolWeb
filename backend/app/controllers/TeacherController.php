<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Teacher;

class TeacherController
{
    private $teacher;

    public function __construct(Teacher $teacher)
    {
        $this->teacher = $teacher;
    }

    // Get all teachers
    public function getAllTeachers(Request $request, Response $response, array $args = []): Response
    {
        $teachers = $this->teacher->getAll();
        $response->getBody()->write(json_encode($teachers));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Add a new teachers
    public function createteacher(Request $request, Response $response, array $args = []): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        $teacherId = $this->teacher->create($data);
        $response->getBody()->write(json_encode(['teacher_id' => $teacherId]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
