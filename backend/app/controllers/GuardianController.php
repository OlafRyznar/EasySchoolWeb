<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Guardian;

class GuardianController
{
    private $guardian;

    public function __construct(Guardian $guardian)
    {
        $this->guardian = $guardian;
    }

    // Get all guardians
    public function getAllGuardians(Request $request, Response $response, array $args = []): Response
    {
        $guardians = $this->guardian->getAll();
        $response->getBody()->write(json_encode($guardians));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Add a new guardian
    public function createGuardian(Request $request, Response $response, array $args = []): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        $guardianId = $this->guardian->create($data);
        $response->getBody()->write(json_encode(['guardian_id' => $guardianId]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
