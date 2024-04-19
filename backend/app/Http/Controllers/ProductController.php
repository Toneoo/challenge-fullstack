<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Repositories\Product\ListarRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $listarRepository = new ListarRepository();
        $data = $listarRepository->listar($request->all())->get();

        return response()->json(['data' => $data], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $product = Product::create($request->all());
        return response()->json(['data' => $product], 201);
    }

    public function show($id): JsonResponse
    {
        $product = Product::find($id);

        return response()->json(['data' => $product], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);
        $product->update($request->all());

        return response()->json(['data' => $product], 200);
    }

    public function destroy($id): JsonResponse
    {
        Product::find($id)->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
