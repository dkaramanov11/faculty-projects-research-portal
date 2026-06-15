<?php

namespace App\Http\Controllers;

use App\Enums\ApprovalStatus;
use App\Http\Resources\ProjectCreationRequestResource;
use App\Models\Project;
use App\Models\ProjectCreationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectCreationRequestController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $requests = ProjectCreationRequest::query()
            ->latest()
            ->get();

        return ProjectCreationRequestResource::collection($requests);
    }

    public function approve(ProjectCreationRequest $projectCreationRequest): ProjectCreationRequestResource
    {
        $projectCreationRequest->update([
            'status' => ApprovalStatus::APPROVED,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        $projectCreationRequest->project->update([
            'approval_status' => ApprovalStatus::APPROVED,
        ]);

        return ProjectCreationRequestResource::make($projectCreationRequest);
    }

    public function reject(ProjectCreationRequest $projectCreationRequest): ProjectCreationRequestResource
    {
        $projectCreationRequest->update([
            'status' => ApprovalStatus::REJECTED,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        $projectCreationRequest->project->update([
            'approval_status' => ApprovalStatus::REJECTED,
        ]);

        return ProjectCreationRequestResource::make($projectCreationRequest);
    }

    public function approveByProject(Project $project): ProjectCreationRequestResource
    {
        $request = ProjectCreationRequest::query()
            ->firstOrCreate(
                [
                    'project_id' => $project->id,
                ],
                [
                    'user_id' => $project->created_by,
                    'status' => ApprovalStatus::PENDING,
                ]
            );

        return $this->approve($request);
    }

    public function rejectByProject(Project $project): ProjectCreationRequestResource
    {
        $request = ProjectCreationRequest::query()
            ->firstOrCreate(
                [
                    'project_id' => $project->id,
                ],
                [
                    'user_id' => $project->created_by,
                    'status' => ApprovalStatus::PENDING,
                ]
            );

        return $this->reject($request);
    }

    public function destroy(ProjectCreationRequest $projectCreationRequest): JsonResponse
    {
        $projectCreationRequest->delete();

        return response()->json([
            'message' => 'Project creation request deleted successfully.'
        ]);
    }

}
