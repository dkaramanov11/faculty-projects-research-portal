<?php

namespace App\Actions\Projects;

use App\Enums\ProjectApprovalStatus;
use App\Models\Project;
use App\Models\ProjectCreationRequest;

class CreateProjectAction
{
    public function execute(array $data): Project
    {
        $data['created_by'] = auth()->id();
        $data['approval_status'] = ProjectApprovalStatus::PENDING;

        $project = Project::query()->create($data);

        ProjectCreationRequest::query()->create([
            'project_id' => $project->id,
            'user_id' => auth()->id(),
            'status' => ProjectApprovalStatus::PENDING,
            'message' => null,
        ]);

        return $project;
    }
}
