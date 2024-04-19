Projeto Laravel com React

Este é um exemplo de um projeto que utiliza Laravel como backend e React como frontend. Este PROJECT
fornece instruções detalhadas sobre como configurar e executar o projeto.


Requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina antes de prosseguir:

    Docker
    Node.js
    NPM

Configuração do Backend (Laravel)

  Clone o repositório:

``` 
git clone https://github.com/MateusAntunes95/challenge-fullstack.git
``` 

Rode os seguintes comandos na raiz do projeto:
```
 docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

``` 
vendor/bin/sail up -d
```

``` 
sudo chmod -R 777 storage
```

```
sudo chmod -R 777 .env
```

``` 
vendor/bin/sail php artisan key:generate
 ```

``` 
vendor/bin/sail php artisan migrate
```
``` 
vendor/bin/sail php artisan db:seed
``` 

Configuração do Frontend (React)

```
cd ../frontend
```


```
npm install
```

```
npm start
``` 

O frontend estará acessível em http://localhost:3000

Usuario para teste

Email:

```
admin@teste.com
```
Senha:
```
123
```

