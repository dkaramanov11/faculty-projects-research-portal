<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfessorRoleRequestResource;
use App\Models\ProfessorRoleRequest;
use App\Models\ProjectRequest;
use Illuminate\Http\Request;
use App\Enums\ProjectRequestStatus;
use App\Enums\ProjectRequestType;
use App\Http\Resources\ProjectRequestResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use App\Models\User;
use App\Enums\ApprovalStatus;
use App\Http\Resources\ProjectCreationRequestResource;
use App\Models\ProjectCreationRequest;

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

    public function inbox(): JsonResponse
    {
        $userId = auth()->id();

        $projectRequests = ProjectRequest::query()
            ->where(function ($query) use ($userId) {
                $query->where('receiver_id', $userId)
                    ->where('status', ProjectRequestStatus::PENDING)
                    ->where('deleted_by_receiver', false);
            })
            ->orWhere(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->whereIn('status', [
                        ProjectRequestStatus::ACCEPTED,
                        ProjectRequestStatus::REJECTED,
                    ])
                    ->where('deleted_by_sender', false);
            })
            ->latest()
            ->get()
            ->map(fn ($request) => ProjectRequestResource::make($request)->resolve());

        $projectCreationRequests = ProjectCreationRequest::query()
            ->where('user_id', $userId)
            ->whereIn('status', [
                ApprovalStatus::APPROVED,
                ApprovalStatus::REJECTED,
            ])
            ->where('deleted_by_user', false)
            ->latest()
            ->get()
            ->map(fn ($request) => ProjectCreationRequestResource::make($request)->resolve());

        $professorRoleRequests = ProfessorRoleRequest::query()
            ->where('user_id', $userId)
            ->whereIn('status', [
                ApprovalStatus::APPROVED,
                ApprovalStatus::REJECTED,
            ])
            ->where('deleted_by_user', false)
            ->whereNotNull('reviewed_at')
            ->latest()
            ->get()
            ->map(fn ($request) => ProfessorRoleRequestResource::make($request)->resolve());

        $items = $projectRequests
            ->merge($projectCreationRequests)
            ->merge($professorRoleRequests)
            ->sortByDesc('created_at')
            ->values();

        return response()->json([
            'data' => $items
        ]);
    }

    public function unreadCount(): JsonResponse
    {
        $user = auth()->user();
        $lastSeen = $user->last_inbox_seen_at;

        $projectRequestsCount = ProjectRequest::query()
            ->where(function ($query) use ($user) {
                $query->where('receiver_id', $user->id)
                    ->where('status', ProjectRequestStatus::PENDING);
            })
            ->orWhere(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                    ->whereIn('status', [
                        ProjectRequestStatus::ACCEPTED,
                        ProjectRequestStatus::REJECTED,
                    ]);
            })
            ->when($lastSeen, fn ($query) =>
            $query->where('updated_at', '>', $lastSeen)
            )
            ->count();

        $projectCreationRequestsCount = ProjectCreationRequest::query()
            ->where('user_id', $user->id)
            ->whereIn('status', [
                ApprovalStatus::APPROVED,
                ApprovalStatus::REJECTED,
            ])
            ->whereNotNull('reviewed_at')
            ->when($lastSeen, fn ($query) =>
            $query->where('updated_at', '>', $lastSeen)
            )
            ->count();

        $professorRoleRequestsCount = ProfessorRoleRequest::query()
            ->where('user_id', $user->id)
            ->whereIn('status', [
                ApprovalStatus::APPROVED,
                ApprovalStatus::REJECTED,
            ])
            ->whereNotNull('reviewed_at')
            ->when($lastSeen, fn ($query) =>
            $query->where('updated_at', '>', $lastSeen)
            )
            ->count();

        return response()->json([
            'count' =>
                $projectRequestsCount +
                $projectCreationRequestsCount +
                $professorRoleRequestsCount
        ]);
    }

    public function markInboxAsRead(): JsonResponse
    {
        auth()->user()->update([
            'last_inbox_seen_at' => now()
        ]);

        return response()->json([
            'message' => 'Inbox marked as read.'
        ]);
    }

}
