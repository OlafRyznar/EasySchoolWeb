<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\ClassModel;

class ClassController
{
    private $classModel;

    public function __construct(ClassModel $classModel)
    {
        $this->classModel = $classModel;
    }

    public function getAllClasses(Request $request, Response $response, array $args = []): Response
    {
        $classes = $this->classModel->getAll();
        $response->getBody()->write(json_encode($classes));
        return $response->withHeader('Content-Type', 'application/json');
    }
}

