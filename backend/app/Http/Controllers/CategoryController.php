<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::all());
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
    public function store(CategoryRequest $request) : CategoryResource
    {
        $category = Category::query()
            ->create($request->validated());

        return CategoryResource::make($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category) : CategoryResource
    {
        return CategoryResource::make($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category) : CategoryResource
    {
        $category->update($request->validated());

        return CategoryResource::make($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category) : JsonResponse
    {
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.'
        ]);
    }
}
