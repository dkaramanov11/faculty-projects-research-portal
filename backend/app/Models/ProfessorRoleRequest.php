<?php

namespace App\Models;

use App\Enums\ApprovalStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfessorRoleRequest extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'message',
        'admin_feedback',
        'reviewed_at',
        'deleted_by_user',
    ];

    protected $casts = [
        'status' => ApprovalStatus::class,
        'reviewed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
