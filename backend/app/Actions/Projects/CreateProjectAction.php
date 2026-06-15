<?php

namespace App\Actions\Projects;

use App\Enums\ProjectApprovalStatus;
use App\Enums\UserRole;
use App\Models\Project;
use App\Models\ProjectCreationRequest;

class CreateProjectAction
{
    public function execute(array $data): Project
    {
        $user = auth()->user();

        $data['created_by'] = $user->id;

        $shouldApproveImmediately =
            $user->role === UserRole::PROFESSOR;

        $data['approval_status'] = $shouldApproveImmediately
            ? ProjectApprovalStatus::APPROVED
            : ProjectApprovalStatus::PENDING;

        $project = Project::query()->create($data);

        if (!$shouldApproveImmediately) {
            ProjectCreationRequest::query()->create([
                'project_id' => $project->id,
                'user_id' => $user->id,
                'status' => ProjectApprovalStatus::PENDING,
                'message' => null,
            ]);
        }

        return $project;
    }
}
