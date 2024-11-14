<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DetectionController;

// Ruta para la vista principal
Route::get('/', function () {
    return view('index');
});

Route::get('/fraudlock', function () {
    return view('fraudlock');
});


// Ruta para obtener los datos del gráfico de tiempo
Route::get('/detections', [DetectionController::class, 'getData']);

// Ruta para obtener los datos del gráfico de tasa de detección
Route::get('/detection-rate-data', [DetectionController::class, 'getDetectionRateData']);

// Ruta para obtener los datos del gráfico de tasa de detección en porcentaje
Route::get('/detection-rate-percentage-data', [DetectionController::class, 'getDetectionRatePercentageData']);

// Ruta para obtener los datos del gráfico de número de detecciones
Route::get('/detection-count-data', [DetectionController::class, 'getDetectionCountData']);
