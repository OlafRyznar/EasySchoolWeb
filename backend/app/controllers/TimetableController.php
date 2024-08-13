<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Timetable;

class TimetableController
{
    private $timetableModel;

    public function __construct(Timetable $timetableModel)
    {
        $this->timetableModel = $timetableModel;
    }

    // Pobiera wszystkie plany lekcji
    public function getByClass(Request $request, Response $response): Response
    {
        $classId = $request->getAttribute('class_id');
        if (!$classId) {
            $response->getBody()->write(json_encode(['error' => 'Class ID is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }
    
        $timetable = $this->timetableModel->getByClass($classId); // Użycie właściwej właściwości
        if (empty($timetable)) {
            $response->getBody()->write(json_encode(['message' => 'No timetable found for this class.']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
    
        $response->getBody()->write(json_encode($timetable));
        return $response->withHeader('Content-Type', 'application/json');
    }

}
