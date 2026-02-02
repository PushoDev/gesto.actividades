<?php

use App\Http\Controllers\ActividadController;
use Illuminate\Support\Facades\Route;

Route::resource('actividades', ActividadController::class)->names('actividades');
