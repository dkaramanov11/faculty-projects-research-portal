<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectCreationRequestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'inbox_type' => 'project_creation',
            'status' => $this->status->value,
            'message' => $this->message,

            'project' => $this->project ? [
                'id' => $this->project->id,
                'title' => $this->project->title,
            ] : null,
            'user' => UserResource::make($this->user),

            'created_at' => $this->created_at,
            'reviewed_at' => $this->reviewed_at,
        ];

    }
}
