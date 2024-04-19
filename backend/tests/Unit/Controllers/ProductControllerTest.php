<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\Product;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductControllerTest extends TestCase
{
    public function testStoreMethodCreatesProduct()
    {
        $controller = new ProductController();

        $requestData = [
            'name' => 'Product Test',
            'price' => 10.99,
            'description' => 'This is a test product.'
        ];
        $request = Request::create('/products', 'POST', $requestData);

        $response = $controller->store($request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(201, $response->getStatusCode());

        $product = Product::where('name', 'Product Test')->first();
        $this->assertNotNull($product);
        $this->assertEquals('Product Test', $product->name);
        $this->assertEquals(10.99, $product->price);
        $this->assertEquals('This is a test product.', $product->description);
    }

    public function testUpdateMethodUpdatesProduct()
    {
        $controller = new ProductController();

        $product = Product::create([
            'name' => 'Old Product',
            'price' => 20.99,
            'description' => 'Old product description.'
        ]);

        $requestData = [
            'name' => 'Updated Product',
            'price' => 30.99,
            'description' => 'Updated product description.'
        ];
        $request = Request::create("/products/{$product->id}", 'PUT', $requestData);

        $response = $controller->update($request, $product->id);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $product = $product->fresh();
        $this->assertEquals('Updated Product', $product->name);
        $this->assertEquals(30.99, $product->price);
        $this->assertEquals('Updated product description.', $product->description);
    }

    public function testIndexMethodReturnsListOfProducts()
    {
        $controller = new ProductController();

        $request = Request::create('/products', 'GET');
        $response = $controller->index($request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('data', $responseData);
        $this->assertNotEmpty($responseData['data']);
    }
}
