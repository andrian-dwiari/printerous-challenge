<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
	protected $table = 'person';
    protected $fillable = ['organization_id','name','email','phone','avatar'];
}
