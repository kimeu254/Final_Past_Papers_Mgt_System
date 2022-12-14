<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PastPapersController;
use App\Http\Controllers\UnitsController;
use App\Http\Controllers\FacultiesController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\NewUsersController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/roles', [NewUsersController::class, 'roles']);
Route::get('/users', [NewUsersController::class, 'index']);
Route::post('/user', [NewUsersController::class, 'create']);
Route::put('/user/{id}',[NewUsersController::class,'update']);
Route::delete('/user/{id}',[NewUsersController::class,'destroy']);


Route::post('/upload', [PastPapersController::class, 'upload']);
Route::get('/uploads', [PastPapersController::class, 'index']);


Route::get('/faculties', [FacultiesController::class, 'index']);
Route::post('/faculty', [FacultiesController::class, 'store']);
Route::put('/faculty/{id}',[FacultiesController::class,'update']);
Route::delete('/faculty/{id}',[FacultiesController::class,'destroy']);

Route::get('/courses', [CoursesController::class, 'index']);
Route::post('/course', [CoursesController::class, 'store']);
Route::put('/course/{id}',[CoursesController::class,'update']);
Route::delete('/course/{id}',[CoursesController::class,'destroy']);

Route::get('/units', [UnitsController::class, 'index']);
Route::post('/unit', [UnitsController::class, 'store']);
Route::put('/unit/{id}',[UnitsController::class,'update']);
Route::delete('/unit/{id}',[UnitsController::class,'destroy']);
