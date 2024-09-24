<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelModel extends Model
{
    use HasFactory;

    protected $table = 'models';

    protected $fillable = ['name', 'file_path'];
}
