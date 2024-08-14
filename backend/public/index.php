<?php

use DI\Container;
use DI\Bridge\Slim\Bridge;
use Psr\Container\ContainerInterface;
use App\Controllers\StudentController;
use App\Controllers\BookController;
use App\Controllers\GradeController;
use App\Controllers\SubjectController;
use Nyholm\Psr7\Factory\Psr17Factory;
use Nyholm\Psr7Server\ServerRequestCreator;
use Slim\Factory\AppFactory;
use App\Controllers\ClassController;
use App\Controllers\UserController;
use App\Controllers\MailController;
use App\Controllers\TimetableController;
use App\Controllers\DuesController;
use App\Controllers\ExamController;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;

// Włączenie autoloadera Composer
require __DIR__ . '/../vendor/autoload.php';

// Utworzenie kontenera DI
$container = new Container();

// Ustawienia aplikacji
$container->set('settings', function () {
    return [
        'displayErrorDetails' => true, // Ustaw false na produkcji
    ];
});

// Konfiguracja PDO (połączenie z bazą danych)
$container->set(PDO::class, function(ContainerInterface $container) {
    $settings = $container->get('settings');
    $pdo = new PDO('mysql:host=localhost;dbname=easyschool', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
});

// Rejestracja modeli i kontrolerów
$container->set(App\Models\Student::class, function(ContainerInterface $container) {
    return new App\Models\Student($container->get(PDO::class));
});

$container->set(App\Models\Book::class, function(ContainerInterface $container) {
    return new App\Models\Book($container->get(PDO::class));
});

$container->set(App\Models\Grade::class, function(ContainerInterface $container) {
    return new App\Models\Grade($container->get(PDO::class));
});


 // Rejestracja modelu i kontrolera dla Dues
 $container->set(App\Models\Dues::class, function(ContainerInterface $container) {
    return new App\Models\Dues($container->get(PDO::class));
});

$container->set(DuesController::class, function(ContainerInterface $container) {
    return new DuesController($container->get(App\Models\Dues::class));
});

$container->set(App\Models\Exam::class, function(ContainerInterface $container) {
    return new App\Models\Exam($container->get(PDO::class));
});

$container->set(ExamController::class, function(ContainerInterface $container) {
    return new ExamController($container->get(App\Models\Exam::class));
});



$container->set(App\Models\Subject::class, function(ContainerInterface $container) {
    return new App\Models\Subject($container->get(PDO::class));
});

$container->set(App\Models\UserModel::class, function(ContainerInterface $container) {
    return new App\Models\UserModel($container->get(PDO::class));
});

$container->set(App\Models\Mail::class, function(ContainerInterface $container) {
    return new App\Models\Mail($container->get(PDO::class));
});

$container->set(App\Models\Timetable::class, function(ContainerInterface $container) {
    return new App\Models\Timetable($container->get(PDO::class));
});



$container->set(App\Models\ClassModel::class, function(ContainerInterface $container) {
    return new App\Models\ClassModel($container->get(PDO::class));
});

$container->set(MailController::class, function(ContainerInterface $container) {
    return new MailController($container->get(App\Models\Mail::class));
});

$container->set(TimetableController::class, function(ContainerInterface $container) {
    return new TimetableController($container->get(App\Models\Timetable::class));
});

$container->set(UserController::class, function(ContainerInterface $container) {
    return new UserController($container->get(App\Models\UserModel::class));
});

$container->set(ClassController::class, function(ContainerInterface $container) {
    return new ClassController($container->get(App\Models\ClassModel::class));
});

$container->set(StudentController::class, function(ContainerInterface $container) {
    return new StudentController($container->get(App\Models\Student::class));
});

$container->set(BookController::class, function(ContainerInterface $container) {
    return new BookController($container->get(App\Models\Book::class));
});

$container->set(GradeController::class, function(ContainerInterface $container) {
    return new GradeController($container->get(App\Models\Grade::class));
});

$container->set(SubjectController::class, function(ContainerInterface $container) {
    return new SubjectController($container->get(App\Models\Subject::class));
});



// Tworzenie aplikacji Slim z użyciem kontenera DI
AppFactory::setContainer($container);
$psr17Factory = new Psr17Factory();
AppFactory::setResponseFactory($psr17Factory);
$app = Bridge::create($container);

// Rejestracja tras
(require __DIR__ . '/../routes/web.php')($app);

// Middleware dla CORS
$app->add(function (ServerRequestInterface $request, RequestHandlerInterface $handler) use ($app): ResponseInterface {
    if ($request->getMethod() === 'OPTIONS') {
        $response = $app->getResponseFactory()->createResponse();
    } else {
        $response = $handler->handle($request);
    }

    return $response
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->withHeader('Pragma', 'no-cache');
});

// Tworzenie ServerRequest za pomocą Nyholm PSR-7 Server
$creator = new ServerRequestCreator(
    $psr17Factory, // ServerRequestFactory
    $psr17Factory, // UriFactory
    $psr17Factory, // UploadedFileFactory
    $psr17Factory  // StreamFactory
);
$request = $creator->fromGlobals();

// Uruchomienie aplikacji
$app->run($request);
