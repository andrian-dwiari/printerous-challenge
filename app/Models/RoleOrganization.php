<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleOrganization extends Model
{
    protected $table = 'role_organization';
    protected $fillable = ['user_id','organization_id'];
}
