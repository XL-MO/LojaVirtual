/**
 *  Função para selecionar um item de menu
 *  e carregar os cards correspondentes
 */

// Função para buscar os produtos a partir de um arquivo JSON
function buscaProdutos() {
    var requestURL = "assets/data/produtos.json";

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        produtos = request.response;
        carregarCards(); // Após carregar os produtos, chama a função para carregar os cards na página
    }
}

// Função para resgatar um produto pelo ID
function resgataProduto(id) {
    for (var i = 0; i < produtos.length; i++) {
        var item = produtos[i];
        if (item.id == id) {
            return item;
        }
    }
}

// Função para criar o HTML de um card de produto
function criarCard(produto) {
    var card = "<div class=\"col\">";
    card += "<div class=\"card shadow-sm\">";
    card += `<img src=\"assets/images/produtos/${produto.categoria}/${produto.id}.jpg\" class=\"card-img-top\">`;
    card += "<div class=\"card-body text-center\">";
    card += `<p class=\"card-text\">${produto.nome}</p>`;
    card += `<p class=\"card-text\"> R$ ${produto.preco}</p>`;
    card += "<div class=\"align-items-center\">";
    card += `<button onclick=\"adicionarCarrinho(${produto.id})\" type=\"button\" class=\"btn btn-primary\">Adicionar</button>`;
    card += "</div>";
    card += "</div>";
    card += "</div>";
    card += "</div>";
    return card;
}
// Função para criar o HTML de um card de item do carrinho
function criarCardCarrinho(item) {
    var card = "<div class=\"col\">";
    card += "<div class=\"card shadow-sm\">";
    card += `<img src=\"assets/images/produtos/${item.produto.categoria}/${item.produto.id}.jpg\" class=\"card-img-top\">`;
    card += "<div class=\"card-body text-center\">";
    card += `<p class=\"card-text\">${item.produto.nome}</p>`;
    card += `<p class=\"card-text\"> R$ ${item.produto.preco}</p>`;
    card += `<p class=\"card-text\"> Quantidade: ${item.quantidade}</p>`;
    card += "<div class=\"align-items-center\">";
    card += `<button onclick=\"removerCarrinho(${item.produto.id})\" type=\"button\" class=\"btn btn-danger btn-sm\">Remover</button>`;
    card += "</div>";
    card += "</div>";
    card += "</div>";
    card += "</div>";
    return card;
}

function selecionarMenu(el, categoria) {
    var menus = document.querySelectorAll(".nav-link");
    for (var i = 0; i < menus.length; i++) {                 // Remove os atributos e classes dos menus anteriores
        var menu = menus[i];
        menu.removeAttribute("aria-current");
        menu.setAttribute('class', 'nav-link link-menu');
    }
    el.setAttribute('class', 'nav-link link-menu active'); // Define a classe 'active' para o menu selecionado
    menu.setAttribute("aria-current", "page");

    carregarCards(categoria);                              // Carrega os cards com base na categoria selecionada 
}
// Função para carregar o carrinho na página
function carregarCarrinho() {
    var elementopai = document.getElementById("produtos-carrinho");
    elementopai.innerHTML = "";
    for (var i = 0; i < itemsCarrinho.length; i++) {
        var item = itemsCarrinho[i];
        elementopai.innerHTML += criarCardCarrinho(item);
    }
    var numItensCarrinho = document.getElementById("num-itens-carrinho");
    numItensCarrinho.innerHTML = itemsCarrinho.length;
}

function carregarCardsPesquisa(produtosEncontrados) {
    selecionarMenu(document.querySelector("#menu-todos"))

    var elementopai = document.getElementById("produtos");
    elementopai.innerHTML = ""; // Limpa o conteúdo do elemento "produtos"

    for (var i = 0; i < produtosEncontrados.length; i++) {
        var item = produtosEncontrados[i];
        elementopai.innerHTML += criarCard(item);
    }
}

/**
 *  Função para carregar os cards com possível filtro por categoria
 * @param {string} categoria 
 */
function carregarCards(categoria) {
    var elementopai = document.getElementById("produtos");
    elementopai.innerHTML = ""; // limpa o que está dentro do elemento(produtos)

    var produtosAExibir = [];
    if (categoria) {
        for (var i = 0; i < produtos.length; i++) {
            var item = produtos[i];
            if (item.categoria == categoria) { //filtra por categoria
                produtosAExibir.push(item);
            }
        }
    } else {
        produtosAExibir = produtos;
    }
    // Cria os cards para os produtos a serem exibidos
    for (var i = 0; i < produtosAExibir.length; i++) {
        var item = produtosAExibir[i];
        elementopai.innerHTML += criarCard(item);
    }
}

var itemsCarrinho = [];                     // Array para armazenar os itens do carrinho


// Função para adicionar item ao carrinho
function adicionarCarrinho(id) {
    var item = resgataProduto(id);
    if (item) {
        var existe = false;
        for (var i = 0; i < itemsCarrinho.length; i++) {
            var itemCarrinho = itemsCarrinho[i];
            if (itemCarrinho.produto.id == id) {
                itemsCarrinho[i].quantidade += 1;
                existe = true;
                break;
            }
        }

        if (existe === false) {
            var itemCarrinho = {
                "produto": item,
                "quantidade": 1
            };
            itemsCarrinho.push(itemCarrinho);
        }
        carregarCarrinho();
    }
}

// Função para remover item do carrinho
function removerCarrinho(id) {
    var item = resgataProduto(id);
    if (item) {
        for (var i = 0; i < itemsCarrinho.length; i++) {
            var itemCarrinho = itemsCarrinho[i];
            if (itemCarrinho.produto.id == id) {
                if (itemCarrinho.quantidade > 1) {
                    itemsCarrinho[i].quantidade -= 1;
                } else {
                    itemsCarrinho.splice(i, 1);
                }


                break;
            }
        }
        carregarCarrinho();
    }
}

// Função para calcular o valor total de cada item no carrinho
function calcularValorItemCarrinho(item) {
    return item.produto.preco * item.quantidade;
}

// Função para pesquisar um produto
function pesquisarProduto(form) {
    var input = form.querySelector('input');
    var termoPesquisa = input.value;
    if (termoPesquisa) {
        var produtosEncontrados = [];
        for (var i = 0; i < produtos.length; i++) {
            var produto = produtos[i];
            if (produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())) {
                produtosEncontrados.push(produto);
            }
        }

        // Carrega os cards com os produtos encontrados
        carregarCardsPesquisa(produtosEncontrados);
    } else {
        carregarCards()
    }


}




window.setTimeout(buscaProdutos, 1000);    //aguarda 1 segundo para buscar produtos






























