<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Subject;

class SubjectController
{
    private $subject;

    public function __construct(Subject $subject)
    {
        $this->subject = $subject;
    }

    public function getAllSubjects(Request $request, Response $response, array $args = []): Response
    {
        $subjects = $this->subject->getAll();
        $response->getBody()->write(json_encode($subjects));
        return $response->withHeader('Content-Type', 'application/json');
    }
}