<?php

namespace App\Http\Controllers;

use App\Models\ProjectRequest;
use Illuminate\Http\Request;
use App\Enums\ProjectRequestStatus;
use App\Enums\ProjectRequestType;
use App\Http\Resources\ProjectRequestResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectRequestController extends Controller
{
    /**
     * My requests
     */
    public function index()
    {
        $requests = ProjectRequest::query()
            ->where('receiver_id', auth()->id())
            ->latest()
            ->get();

        return ProjectRequestResource::collection($requests);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Send request to join
     */
    public function store(Request $request, Project $project): ProjectRequestResource
    {
        $validated = $request->validate([
            'message' => ['nullable', 'string'],
        ]);

        $projectRequest = ProjectRequest::query()->create([
            'project_id' => $project->id,
            'sender_id' => auth()->id(),
            'receiver_id' => $project->created_by,
            'type' => ProjectRequestType::PARTICIPATION,
            'status' => ProjectRequestStatus::PENDING,
            'message' => $validated['message'] ?? null,
        ]);

        return ProjectRequestResource::make($projectRequest);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProjectRequest $projectRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProjectRequest $projectRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProjectRequest $projectRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectRequest $projectRequest)
    {
        //
    }
    public function accept(ProjectRequest $projectRequest): ProjectRequestResource
    {
        $projectRequest->update([
            'status' => ProjectRequestStatus::ACCEPTED,
        ]);

        $projectRequest->project
            ->participants()
            ->syncWithoutDetaching([$projectRequest->sender_id]);

        return ProjectRequestResource::make($projectRequest);
    }

    public function reject(ProjectRequest $projectRequest): ProjectRequestResource
    {
        $projectRequest->update([
            'status' => ProjectRequestStatus::REJECTED,
        ]);

        return ProjectRequestResource::make($projectRequest);
    }
}
