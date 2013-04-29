
# [Adayer](http://adlayer.com.br) Javascript Library

## O que é isso ?

Essa biblioteca contem um conjunto de módulos para interagir com dados do Adlayer.

A missão principal da JS Lib é evitar a replicação de código em projetos Javascript que lidam com as estruturas de dados da Adlayer.

> "Don't repeat yourself"

## Modulos

O Adlayer JS Lib inclui classes de estruturas básicas como paginas, sites, espaços, peças e de responsabilidade mais avançadas como comunicação com o [Adlayer Ad Server](https://github.com/adlayer/adserver-api-docs) e o [Adlayer Tracker](https://github.com/adlayer/tracker-api-docs).

Atualmente a biblioteca inclui os seguintes módulos:

* Ads
* Connection
* DOM
* Domain
* Node_modules
* Request
* Spaces
* Utils

## Cross Plataforma

Adlayer usa e abusa de javascript em seu backend e frontend, portanto a Adlayer javascript library foi criada para ser usada em múltiplos ambientes.

### Common JS & require

Todos os módulos podem ser importados em ambientes que suportam common.js 1.0 como Node.js, Couchdb e etc.

### Node.js

Usar o Adlayer js lib no node.js é bem simples, basta clonar este repositório dentro de seu projeto e incluir o modulo desejado:
EX:

```
npm install adlayer-library
```

```javascript
var lib = require('adlayer-library');
var AdDom = lib.AdDom;
```

### Browser

Para usar os módulos da Adlayer JS Lib em um páginas web inclua antes de qualquer módulos o arquivo ./src/module.js.

Depois do 'module.js' ter sido incluído você poderá carregar os modulos que serão utilizados:
```html
<script src="../../src/module.js"></script>

<script src="../../src/domain/ad.js"></script>
<script src="../../src/domain/space.js"></script>
<script src="../../src/domain/page.js"></script>
```

E para para usar um modulo carregado:
```javascript
var FloaterSpace = require('../../src/spaces/floater_space').FloaterSpace;
var floater = new Floater();
floater.close();
```

## Casos de uso

Grande parte do código usado em nossa [api javascript oficial](https://github.com/adlayer/javascript-api) é extraído dessa biblioteca.


## Desenvolvimento
```
npm install .
```

### Testes

Todos os módulos possuem teste unitários escritos usando [Mocha](https://github.com/visionmedia/mocha) e [expect.js](https://github.com/LearnBoost/expect.js)

Para rodar os teste unitários faça:

```
make test
```
 
## Copyright

Copyright (c) 2013 Adlayer Soluções Tecnológicas
&lt;adlayer@adlayer.org&gt;