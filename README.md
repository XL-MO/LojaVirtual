# LojaVirtual
Desenvolver um carrinho de compras, com três segmentos

O código apresentado é uma página web que representa uma loja online com funcionalidades de exibição de produtos, pesquisa, adição e remoção de itens no carrinho de compras, além de um rodapé com menus de informações e links diversos.

Cabeçalho (Header):
Contém o  logotipo da loja, barra de pesquisa, links de navegação e icones de carrinho de compras

Conteúdo Principal:
O conteúdo principal da página é representado por um contêiner <div> com a classe "container". Nesse contêiner, são exibidos os cards dos produtos disponíveis para compra. Os cards foram criados usando JavaScript com base nos dados de um arquivo JSON (produtos.json) que contém informações sobre os produtos.

Cards de Produtos:
Os cards de produtos são exibidos em uma grade usando a classe "col" do Bootstrap. Cada card contém a imagem do produto, o nome, o preço e um botão "Adicionar" que permite ao usuário adicionar o produto ao carrinho de compras pela função criarCard(produto).

Barra de Pesquisa:
A página possui uma barra de pesquisa onde o usuário pode pesquisar por produtos pelo seu nome. A pesquisa é realizada em tempo real conforme o usuário digita no campo de pesquisa. A função pesquisarProduto(form) é responsável por realizar a pesquisa e exibir os resultados correspondentes na página.

Carrinho de Compras:
O carrinho de compras é representado por outro contêiner <div> com a classe "produtos-carrinho". Os itens adicionados ao carrinho são exibidos em cards, mostrando a imagem, nome, preço e quantidade de cada item. Os itens do carrinho são armazenados em um array chamado itemsCarrinho.

Botões do Carrinho:
Cada card de produto possui um botão "Adicionar" que, quando clicado, chama a função adicionarCarrinho(id) para adicionar o item correspondente ao carrinho. Além disso, os cards de itens do carrinho têm um botão "Remover" que chama a função removerCarrinho(id) para remover o item do carrinho.

Funções de Carrinho:
As funções adicionarCarrinho(id), removerCarrinho(id) e calcularValorItemCarrinho(item) são responsáveis por gerenciar o carrinho de compras. Elas atualizam a quantidade de itens, removem itens e calculam o valor total de cada item no carrinho.

Rodapé (Footer):
O rodapé da página é dividido em três partes:

a. Menu de Ajuda e Suporte
b. Menu de Atendimento ao Cliente
c. Menu de Privacidade

Cada menu contém links que fornecem informações adicionais sobre a loja, como política de frete, devoluções, rastreamento, etc.

Há também um trecho do código que apresenta o logotipo da loja e informações sobre as formas de pagamento aceitas. 

A página é responsiva e usa a biblioteca Bootstrap para ajudar a criar um layout amigável em diferentes dispositivos e tamanhos de tela.

O JavaScript é usado para criar os elementos dinâmicos na página, realizar pesquisas, adicionar e remover itens do carrinho e realizar outras interações do usuário.

Em resumo, o código apresentado representa uma loja online com recursos básicos de exibição e busca de produtos, além de funcionalidades de carrinho de compras e informações de rodapé. Com mais detalhes de estilo e imagens, a página estará pronta para uso e apresentação ao usuário.
