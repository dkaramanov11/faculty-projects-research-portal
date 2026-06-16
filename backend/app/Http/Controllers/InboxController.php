<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Models\ProjectRequest;
use App\Models\ProjectCreationRequest;
use App\Models\ProfessorRoleRequest;
class InboxController extends Controller
{
    public function deleteNotification(
        Request $request
    ): JsonResponse
    {
        $user = auth()->user();

        $id = $request->id;
        $type = $request->type;

        if ($type === 'project_request') {

            $notification =
                ProjectRequest::findOrFail($id);

            if ($notification->sender_id === $user->id) {
                $notification->update([
                    'deleted_by_sender' => true
                ]);
            }

            if ($notification->receiver_id === $user->id) {
                $notification->update([
                    'deleted_by_receiver' => true
                ]);
            }
        }

        if ($type === 'project_creation') {

            ProjectCreationRequest::whereKey($id)
                ->update([
                    'deleted_by_user' => true
                ]);
        }

        if ($type === 'professor_role') {

            ProfessorRoleRequest::whereKey($id)
                ->update([
                    'deleted_by_user' => true
                ]);
        }

        return response()->json([
            'message' => 'Notification deleted.'
        ]);
    }
}
