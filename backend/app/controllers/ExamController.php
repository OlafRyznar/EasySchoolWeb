<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Exam;

class ExamController
{
    private $examModel;

    public function __construct(Exam $examModel)
    {
        $this->examModel = $examModel;
    }

    public function getAllExams(Request $request, Response $response, array $args = []): Response
    {
        $exams = $this->examModel->getAll();
        $response->getBody()->write(json_encode($exams));
        return $response->withHeader('Content-Type', 'application/json');
    }

      public function getExamsByUser(Request $request, Response $response): Response
      {
          $userId = $request->getAttribute('user_id');
          if (!$userId) {
              $response->getBody()->write(json_encode(['error' => 'User ID is required']));
              return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
          }
  
          $exams = $this->examModel->getByUserId($userId);
          if (empty($exams)) {
              $response->getBody()->write(json_encode(['message' => 'No exams found for this user.']));
              return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
          }
  
          $response->getBody()->write(json_encode($exams));
          return $response->withHeader('Content-Type', 'application/json');
      }
      public function createExam(Request $request, Response $response, array $args = []): Response
{
    // Read data from the request
    $data = json_decode($request->getBody()->getContents(), true);

    // Validate required fields
    if (empty($data['subject_id']) || empty($data['added_by']) || empty($data['name']) || empty($data['date']) || empty($data['score']) || empty($data['user_id'])) {
        $response->getBody()->write(json_encode(['error' => 'All fields are required']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    // Create a new exam
    $examId = $this->examModel->create($data);

    // Check if the creation was successful
    if ($examId) {
        // Response with the newly created ID
        $response->getBody()->write(json_encode(['id' => $examId]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    } else {
        $response->getBody()->write(json_encode(['error' => 'Failed to create exam']));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
}
}
