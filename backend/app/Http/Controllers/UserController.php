<?php

namespace App\Http\Controllers;

use App\Enums\ApprovalStatus;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(User::all());
    }
    public function show(User $user): UserResource
    {
        return UserResource::make($user);
    }

    public function profileProjects(): JsonResponse
    {
        $user = auth()->user();

        $createdProjects = Project::query()
            ->where('created_by', $user->id)
            ->where('approval_status', ApprovalStatus::APPROVED)
            ->latest()
            ->get();

        $pendingProjects = Project::query()
            ->where('created_by', $user->id)
            ->where('approval_status', ApprovalStatus::PENDING)
            ->latest()
            ->get();

        $participatingProjects = $user->projects()
            ->where('approval_status', ApprovalStatus::APPROVED)
            ->where('created_by', '!=', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'created_projects' => ProjectResource::collection($createdProjects),
            'participating_projects' => ProjectResource::collection($participatingProjects),
            'pending_projects' => ProjectResource::collection($pendingProjects),
        ]);
    }
    public function updateProfile(Request $request): UserResource
    {
        $user = auth()->user();

        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
        ]);

        $user->update($validated);

        return UserResource::make($user);
    }
}

