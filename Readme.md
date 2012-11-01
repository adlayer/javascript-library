
# [Adayer](http://adlayer.com.br) Javascript Library

## O que é isso ?

Essa biblioteca contem um conjunto de modulos para interagir com o modelo do Adlayer Adserver.
Este projeto é compartilhado por diversos projetos internos e externos.
A missão principal da Adlayer Javascript Library é evitar a replicação de código em projetos Javascript que lidam com dados da Adlayer.

## Modulos

O Adlayer JS Lib inclui classes de estruturas básicos como paginas, sites, espaços, peças e de responsabilidade mais avançadas como comunicação com o Adlayer Ad Server (jocasta) e o Adlayer Tracker.

Atualmente a biblioteca inclui os seguintes modulos:
* Ads
* Api
* Config
* Connection
* DOM
* Domain
* Node_modules
* Request
* Spaces
* Tracker
* Utils

## Cross Plataforma

Adlayer usa e abusa de javascript em seu backend e frontend, portanto a Adlayer javascript library foi criada para ser usada em múltiplos ambientes.

### Common JS & require

Todos os módulos podem ser importados em ambientes que suportam common.js 1.0 como Node.js, Couchdb e etc.

### Node.js

Usar o Adlayer js lib no node.js é bem simples basta clonar este repositório dentro de seu projeto e incluir o modulo desejado:
EX:
```javascript
var AdDom = require('./javascript-library/src/dom/ad_dom').AdDom;
```

### Browser

Para usar os módulos da Adlayer JS Lib em um navegador web inclua antes de qualquer módulos o arquivo ./src/module.js.

Depois do module.js ter sido incluido você poderá adicionar os modulos que precisará:
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

Grande parte do código usado em nossa api javascript oficial é extraído dessa biblioteca.

## Testes

Todos os módulos possuem teste unitários escritos usando Mocha e expect.js
 
## The open source license will be attached soon

## Copyright

Copyright (c) 2011 Adlayer Adserver
&lt;adalyer@adlayer.org&gt;