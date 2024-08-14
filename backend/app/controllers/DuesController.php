<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Dues;

class DuesController
{
    private $duesModel;

    public function __construct(Dues $duesModel)
    {
        $this->duesModel = $duesModel;
    }

    // Pobiera wszystkie opłaty
    public function getAllDues(Request $request, Response $response, array $args = []): Response
    {
        $dues = $this->duesModel->getAllDues();
        $response->getBody()->write(json_encode($dues));
        return $response->withHeader('Content-Type', 'application/json');
    }
        public function getDuesByUser(Request $request, Response $response, array $args = []): Response
    {
        $userId = $args['user_id'];

        if (!$userId) {
            $response->getBody()->write(json_encode(['error' => 'User ID is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $dues = $this->dueModel->getByUserId($userId);

        if (empty($dues)) {
            $response->getBody()->write(json_encode(['message' => 'No dues found for this user.']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($dues));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
