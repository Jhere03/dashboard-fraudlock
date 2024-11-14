<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detection extends Model
{
    use HasFactory;

    protected $table = 'Detections'; 
    protected $fillable = ['fecha', 'time']; 
}

