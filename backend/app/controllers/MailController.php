<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Mail;

class MailController
{
    private $mailModel;

    public function __construct(Mail $mailModel)
    {
        $this->mailModel = $mailModel;
    }

    // Pobiera wszystkie e-maile
    public function getAllMails(Request $request, Response $response, array $args = []): Response
    {
        $mails = $this->mailModel->getAllMails();
        $response->getBody()->write(json_encode($mails));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
