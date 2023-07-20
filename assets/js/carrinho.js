var itemsCarrinho = []; // Array para armazenar os itens do carrinho

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
function calcularValorItemCarrinho() {
    let valorTotal = floatToText(total);
}


// Função para carregar o carrinho na página
function carregarCarrinho() {
    var elementopai = document.getElementById("produtos-carrinho");
    elementopai.innerHTML = "";

    var valorTotalCarrinho = 0; // Variável para armazenar o valor total do carrinho

    for (var i = 0; i < itemsCarrinho.length; i++) {
        var item = itemsCarrinho[i];
        elementopai.innerHTML += criarCardCarrinho(item);

        // Calcula o valor total do item
        var valorTotalItem = calcularValorItemCarrinho(item);

        // Soma o valor total do item ao valor total do carrinho
        valorTotalCarrinho += valorTotalItem;
    }

    // Exibe o valor total do carrinho no elemento correspondente
    var valorTotalCarrinhoElement = document.getElementById("valor-total-carrinho");
    valorTotalCarrinhoElement.innerText = "R$ " + valorTotalCarrinho.toFixed(2);

    var numItensCarrinho = document.getElementById("num-itens-carrinho");
    numItensCarrinho.innerHTML = itemsCarrinho.length;
}


// Atualizar o valor total do carrinho
var valorTotalCarrinho = calcularValorTotal();
document.getElementById("valor-total-carrinho").innerText = "R$ " + valorTotalCarrinho;

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

// ... (continuação do código)
window.setTimeout(buscaProdutos, 1000); // Aguarda 1 segundo para buscar produtos
