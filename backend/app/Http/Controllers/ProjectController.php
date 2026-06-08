<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : AnonymousResourceCollection
    {
        return ProjectResource::collection(Project::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request) : ProjectResource
    {
       $project = Project::query()
           ->create($request->validated());

        return ProjectResource::make($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project) : ProjectResource
    {
        return ProjectResource::make($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project) : ProjectResource
    {
        $project->update($request->validated());

        return ProjectResource::make($project);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project) : \Illuminate\Http\JsonResponse
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.'
        ]);
    }

    public function addParticipant(Project $project, User $user): ProjectResource
    {
        $project->participants()->syncWithoutDetaching([$user->id]);

        return ProjectResource::make($project->load('participants'));
    }

    public function removeParticipant(Project $project, User $user): JsonResponse
    {
        $project->participants()->detach($user->id);

        return response()->json([
            'message' => 'Participant removed successfully.'
        ]);
    }
}
