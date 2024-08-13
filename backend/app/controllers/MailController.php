<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Mail;

class MailController
{
    private $mail;

    public function __construct(Mail $mail)
    {
        $this->mail = $mail;
    }

    // Pobierz wszystkie maile
    public function getAllMails(Request $request, Response $response, array $args = []): Response
    {
        $mails = $this->mail->getAll();
        $response->getBody()->write(json_encode($mails));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Pobierz maila według ID
    public function getMailById(Request $request, Response $response, array $args = []): Response
    {
        $mailId = (int) $args['id'];
        $mail = $this->mail->getById($mailId);
        if ($mail) {
            $response->getBody()->write(json_encode($mail));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404, 'Mail not found');
    }

    // Dodaj nowego maila
    public function createMail(Request $request, Response $response, array $args = []): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);
        $mailId = $this->mail->create($data);
        $response->getBody()->write(json_encode(['id' => $mailId]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    // Aktualizuj maila
    public function updateMail(Request $request, Response $response, array $args = []): Response
    {
        $mailId = (int) $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);
        $updated = $this->mail->update($mailId, $data);
        if ($updated) {
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404, 'Mail not found');
    }

    // Usuń maila
    public function deleteMail(Request $request, Response $response, array $args = []): Response
    {
        if (isset($args['id'])) {
            $mailId = (int) $args['id'];
            $deleted = $this->mail->delete($mailId);
            if ($deleted) {
                return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
            }
            return $response->withStatus(404, 'Mail not found');
        }
    
        return $response->withStatus(400, 'Invalid request: ID not provided');
    }
}