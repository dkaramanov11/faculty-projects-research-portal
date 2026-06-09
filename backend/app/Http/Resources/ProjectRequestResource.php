<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'type' => $this->type->value,
            'status' => $this->status->value,
            'message' => $this->message,

            'project' => [
                'id' => $this->project->id,
                'title' => $this->project->title,
            ],

            'sender' => UserResource::make($this->sender),

            'receiver' => UserResource::make($this->receiver),

            'created_at' => $this->created_at,
        ];
    }
}
