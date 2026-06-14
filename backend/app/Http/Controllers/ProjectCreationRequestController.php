<?php

namespace App\Http\Controllers;

use App\Enums\ProjectApprovalStatus;
use App\Http\Resources\ProjectCreationRequestResource;
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
            'status' => ProjectApprovalStatus::APPROVED,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        $projectCreationRequest->project->update([
            'approval_status' => ProjectApprovalStatus::APPROVED,
        ]);

        return ProjectCreationRequestResource::make($projectCreationRequest);
    }

    public function reject(ProjectCreationRequest $projectCreationRequest): ProjectCreationRequestResource
    {
        $projectCreationRequest->update([
            'status' => ProjectApprovalStatus::REJECTED,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        $projectCreationRequest->project->update([
            'approval_status' => ProjectApprovalStatus::REJECTED,
        ]);

        return ProjectCreationRequestResource::make($projectCreationRequest);
    }
    public function destroy(ProjectCreationRequest $projectCreationRequest): JsonResponse
    {
        $projectCreationRequest->delete();

        return response()->json([
            'message' => 'Project creation request deleted successfully.'
        ]);
    }
}
