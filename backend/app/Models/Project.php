<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Enums\ProjectStatus;
use App\Enums\ProjectType;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'type',
        'status',
        'category_id',
    ];

    protected $casts = [
        'type' => ProjectType::class,
        'status' => ProjectStatus::class,
    ];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
