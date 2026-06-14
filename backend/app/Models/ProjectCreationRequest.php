<?php

namespace App\Models;

use App\Enums\ProjectApprovalStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectCreationRequest extends Model
{
    protected $fillable = [
        'project_id',
        'user_id',
        'status',
        'message',
        'admin_feedback',
        'reviewed_by',
        'reviewed_at',
    ];

    protected $casts = [
        'status' => ProjectApprovalStatus::class,
        'reviewed_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
