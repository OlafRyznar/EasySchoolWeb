<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Student;

class StudentController
{
    private $student;

    public function __construct(Student $student)
    {
        $this->student = $student;
    }

    // Get all students
    public function getAllStudents(Request $request, Response $response, array $args = []): Response
    {
        $students = $this->student->getAll();
        $response->getBody()->write(json_encode($students));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Add a new student
    public function createStudent(Request $request, Response $response, array $args = []): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        $studentId = $this->student->create($data);
        $response->getBody()->write(json_encode(['student_id' => $studentId]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function getStudentsByClassId(Request $request, Response $response, array $args = []): Response
{
    $classId = $args['class_id'];
    if (!$classId) {
        $response->getBody()->write(json_encode(['error' => 'Class ID is required']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $students = $this->student->getByClassId($classId);
    if (empty($students)) {
        $response->getBody()->write(json_encode(['message' => 'No students found for this class.']));
        return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode($students));
    return $response->withHeader('Content-Type', 'application/json');
}
}
