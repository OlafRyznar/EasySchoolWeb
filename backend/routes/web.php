<?php

use Slim\App;
use App\Controllers\UserController;
use App\Controllers\StudentController;
use App\Controllers\BookController;
use App\Controllers\GradeController;
use App\Controllers\SubjectController;
use App\Controllers\TeacherController;
use App\Controllers\GuardianController;
use Slim\Exception\HttpNotFoundException;
use App\Controllers\ClassController;
use App\Controllers\MailController;
use App\Controllers\TimetableController;
use App\Controllers\StudentSubjectController;



return function (App $app) {



    // Route for fetching all timetable entries
    $app->get('/timetable', [TimetableController::class, 'getAll']);
    $app->get('/timetable/{class_id}', [TimetableController::class, 'getByClass']);


    // Route for getting all users
    $app->get('/users', [UserController::class, 'getAllUsers']);

    // Route for fetching all emails
    $app->get('/mail', [MailController::class, 'getAllMails']);

    // Route for login
    $app->post('/api/auth/login', [AuthController::class, 'login']);

    // Routes for classes
    $app->get('/class', [ClassController::class, 'getAllClasses']);

    // Routes for students
    $app->get('/student', [StudentController::class, 'getAllStudents']);
    $app->post('/student', [StudentController::class, 'createStudent']); // Route for creating a student

    // Routes for teachers
    $app->get('/teacher', [TeacherController::class, 'getAllTeachers']);
    $app->post('/teacher', [TeacherController::class, 'createTeacher']); // Route for creating a teacher

    // Routes for guardians
    $app->get('/guardian', [GuardianController::class, 'getAllGuardians']); // Route to get all guardians
    $app->post('/guardian', [GuardianController::class, 'createGuardian']); // Route for creating a guardian

    // Routes for books
    $app->get('/book', [BookController::class, 'getAllBooks']);
    $app->post('/book', [BookController::class, 'createBook']);
    $app->put('/book/{id}', [BookController::class, 'updateBook']);
    $app->delete('/book/{id}', [BookController::class, 'deleteBook']);

    // Routes for grades
    $app->get('/grade', [GradeController::class, 'getAllGrades']);
    $app->get('/grade/{student_id}', [GradeController::class, 'getGradesByStudent']);
    $app->post('/grade', [GradeController::class, 'createGrade']); // Route for creating a grade

    // Routes for subjects
    $app->get('/subject', [SubjectController::class, 'getAllSubjects']);

    // Route to get subjects by student
    $app->get('/student/{student_id}/subjects', [StudentSubjectController::class, 'getSubjectsByStudent']);
    $app->get('/student_subject/{student_id}', [StudentSubjectController::class, 'getSubjectsByStudent']);

    // Handle unknown routes
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
        throw new HttpNotFoundException($request);
    });
};
