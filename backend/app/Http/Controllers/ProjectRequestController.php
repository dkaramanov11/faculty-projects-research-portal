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
use App\Models\User;

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
    public function store(Request $request, Project $project): ProjectRequestResource|JsonResponse
    {
        $validated = $request->validate([
            'message' => ['nullable', 'string'],
        ]);

        //Да не може да прати барање ако веќе е participant
        if ($project->participants()->where('users.id', auth()->id())->exists()) {
            return response()->json([
                'message' => 'You are already a participant in this project.'
            ], 422);
        }

        //Да не може да прати дупло pending барање
        $existingRequest = ProjectRequest::query()
            ->where('project_id', $project->id)
            ->where('sender_id', auth()->id())
            ->where('status', ProjectRequestStatus::PENDING)
            ->exists();

        if ($existingRequest) {
            return response()->json([
                'message' => 'You already have a pending request for this project.'
            ], 422);
        }
        //

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
    public function accept(ProjectRequest $projectRequest): ProjectRequestResource|JsonResponse
    {
        if ($projectRequest->receiver_id !== auth()->id()) {
            return response()->json([
                'message' => 'You are not allowed to accept this request.'
            ], 403);
        }

        $projectRequest->update([
            'status' => ProjectRequestStatus::ACCEPTED,
        ]);

        $userIdToAdd = $projectRequest->type === ProjectRequestType::INVITATION
            ? $projectRequest->receiver_id
            : $projectRequest->sender_id;

        $projectRequest->project
            ->participants()
            ->syncWithoutDetaching([$userIdToAdd]);

        return ProjectRequestResource::make($projectRequest);
    }

    public function reject(ProjectRequest $projectRequest): ProjectRequestResource|JsonResponse
    {
        if ($projectRequest->receiver_id !== auth()->id()) {
            return response()->json([
                'message' => 'You are not allowed to reject this request.'
            ], 403);
        }

        $projectRequest->update([
            'status' => ProjectRequestStatus::REJECTED,
        ]);

        return ProjectRequestResource::make($projectRequest);
    }

    public function invite(Request $request, Project $project, User $user): ProjectRequestResource|JsonResponse
    {
        $validated = $request->validate([
            'message' => ['nullable', 'string'],
        ]);

        $isCreator = $project->created_by === auth()->id();

        $isProfessorParticipant = $project->participants()
            ->where('users.id', auth()->id())
            ->where('users.role', 'professor')
            ->exists();

        if (!$isCreator && !$isProfessorParticipant) {
            return response()->json([
                'message' => 'You are not allowed to invite users to this project.'
            ], 403);
        }

        if ($project->participants()->where('users.id', $user->id)->exists()) {
            return response()->json([
                'message' => 'This user is already a participant in this project.'
            ], 422);
        }

        $existingRequest = ProjectRequest::query()
            ->where('project_id', $project->id)
            ->where('receiver_id', $user->id)
            ->where('status', ProjectRequestStatus::PENDING)
            ->exists();

        if ($existingRequest) {
            return response()->json([
                'message' => 'This user already has a pending invitation for this project.'
            ], 422);
        }

        $projectRequest = ProjectRequest::query()->create([
            'project_id' => $project->id,
            'sender_id' => auth()->id(),
            'receiver_id' => $user->id,
            'type' => ProjectRequestType::INVITATION,
            'status' => ProjectRequestStatus::PENDING,
            'message' => $validated['message'] ?? null,
        ]);

        return ProjectRequestResource::make($projectRequest);
    }

    public function inbox(): AnonymousResourceCollection
    {
        $userId = auth()->id();

        $requests = ProjectRequest::query()
            ->where(function ($query) use ($userId) {
                $query->where('receiver_id', $userId)
                    ->where('status', ProjectRequestStatus::PENDING);
            })
            ->orWhere(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->whereIn('status', [
                        ProjectRequestStatus::ACCEPTED,
                        ProjectRequestStatus::REJECTED,
                    ]);
            })
            ->latest()
            ->get();

        return ProjectRequestResource::collection($requests);
    }

}
