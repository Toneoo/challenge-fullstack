<?php

namespace App\Repositories\Product;

use App\Models\Product;

class ListarRepository
{
    private $dados;
    private $query;

    public function listar(array $dados)
    {
        $this->dados = $dados;
        $this->query = Product::query();
        info($this->dados);
        $this->select();
        $this->filter();

        return $this->query;
    }

    private function select()
    {
        $this->query->select([
            'id',
            'name',
            'price',
            'quantity',
            'active',
        ]);
    }

    private function filter()
    {
        if (!empty($this->dados['name'])) {
            $this->query->where('name', 'LIKE', '$' . $this->dados['name'] . '%');
        }

        if (!empty($this->dados['id'])) {
            info('entrou aq');
            $this->query->where('id', $this->dados['id']);
        }

        if (!empty($this->dados['price'])) {
            $this->query->where('price', $this->dados['price']);
        }

        if (!empty($this->dados['quantity'])) {
            $this->query->where('quantity', $this->dados['quantity']);
        }
    }
}
