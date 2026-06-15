<?php

namespace App\Http\Controllers;

use App\Enums\ApprovalStatus;
use App\Enums\UserRole;
use App\Http\Resources\ProfessorRoleRequestResource;
use App\Models\ProfessorRoleRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProfessorRoleRequestController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $requests = ProfessorRoleRequest::query()
            ->latest()
            ->get();

        return ProfessorRoleRequestResource::collection($requests);
    }

    public function store(Request $request): ProfessorRoleRequestResource|JsonResponse
    {
        $user = auth()->user();

        if ($user->role === UserRole::PROFESSOR) {
            return response()->json([
                'message' => 'You are already a professor.'
            ], 422);
        }

        $hasPendingRequest = ProfessorRoleRequest::query()
            ->where('user_id', $user->id)
            ->where('status', ApprovalStatus::PENDING)
            ->exists();

        if ($hasPendingRequest) {
            return response()->json([
                'message' => 'You already have a pending professor role request.'
            ], 422);
        }

        $validated = $request->validate([
            'message' => ['nullable', 'string'],
        ]);

        $professorRoleRequest = ProfessorRoleRequest::query()->create([
            'user_id' => $user->id,
            'status' => ApprovalStatus::PENDING,
            'message' => $validated['message'] ?? null,
        ]);

        return ProfessorRoleRequestResource::make($professorRoleRequest);
    }

    public function approve(ProfessorRoleRequest $professorRoleRequest): ProfessorRoleRequestResource
    {
        $professorRoleRequest->update([
            'status' => ApprovalStatus::APPROVED,
            'reviewed_at' => now(),
        ]);

        $professorRoleRequest->user->update([
            'role' => UserRole::PROFESSOR,
        ]);

        return ProfessorRoleRequestResource::make($professorRoleRequest);
    }

    public function reject(ProfessorRoleRequest $professorRoleRequest): ProfessorRoleRequestResource
    {
        $professorRoleRequest->update([
            'status' => ApprovalStatus::REJECTED,
            'reviewed_at' => now(),
        ]);

        return ProfessorRoleRequestResource::make($professorRoleRequest);
    }

    public function destroy(ProfessorRoleRequest $professorRoleRequest): JsonResponse
    {
        $professorRoleRequest->delete();

        return response()->json([
            'message' => 'Professor role request deleted successfully.'
        ]);
    }
}
