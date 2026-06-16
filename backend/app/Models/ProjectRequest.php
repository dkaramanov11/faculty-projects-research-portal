<?php

namespace App\Models;

use App\Enums\ProjectRequestStatus;
use App\Enums\ProjectRequestType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'sender_id',
        'receiver_id',
        'type',
        'status',
        'message',
        'deleted_by_sender',
        'deleted_by_receiver',
    ];

    protected $casts = [
        'type' => ProjectRequestType::class,
        'status' => ProjectRequestStatus::class,
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
