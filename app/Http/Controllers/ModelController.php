<?php

namespace App\Http\Controllers;

use App\Models\ModelModel;
use Illuminate\Http\Request;

class ModelController extends Controller
{
    //

    public function index()
    {
        return response()->json(ModelModel::all());
    }

    public function show(ModelModel $model)
    {
        return response()->json($model);
    }

    public function store(Request $request)
    {
        $model = ModelModel::create($request->all());

        return response()->json($model, 201);
    }

    public function update(Request $request, ModelModel $model)
    {
        $model->update($request->all());

        return response()->json($model, 200);
    }

    public function destroy(ModelModel $model)
    {
        $model->delete();

        return response()->json(null, 204);
    }
}
