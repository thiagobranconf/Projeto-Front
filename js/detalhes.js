const produtos = [
    { id: 1, titulo: "Bolsa Feminina", descricao: "Uma bolsa elegante para o dia a dia.", imagem: "./imgs/bolsa-feminina.webp", preco: 179.00 },
    { id: 2, titulo: "Espuma para banho", descricao: "Para um banho relaxante e renovador.", imagem: "./imgs/Espuma.jpg", preco: 30.00 },
    { id: 3, titulo: "Fone de Ouvido", descricao: "Ótimo volume para escutar sua músicas favoritas.", imagem: "./imgs/fone.jpeg", preco: 99.00 },
    { id: 4, titulo: "Tênis Feminino", descricao: "Tênis confortável e elegante.", imagem: "./imgs/tenis-femininoss.webp", preco: 80.00 },
    { id: 5, titulo: "Tênis", descricao: "Tênis macio e confortável.", imagem: "./imgs/tenis.jpeg", preco: 90.00 },
    { id: 6, titulo: "Umidificador", descricao: "Ajuda a combater a gripe e resfriados.", imagem: "./imgs/umiificador.webp", preco: 200.00 }
];

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

const produto = produtos.find(p => p.id === productId);

if (produto) {
    const container = document.getElementById('product-container');
    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.titulo;

    const titulo = document.createElement('h1');
    titulo.textContent = produto.titulo;

    const descricao = document.createElement('p');
    descricao.textContent = produto.descricao;

    const preco = document.createElement('p');
    preco.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;

    const quantidadeLabel = document.createElement('label');
    quantidadeLabel.textContent = 'Quantidade:';
    quantidadeLabel.htmlFor = 'quantidade';

    const quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.id = 'quantidade';
    quantidadeInput.min = '1';
    quantidadeInput.value = '1';

    const button = document.createElement('button');
    button.textContent = 'Adicionar ao Carrinho';
    button.className = 'btn-adicionar';
    button.onclick = () => adicionarAoCarrinho(produto, parseInt(quantidadeInput.value));

    container.appendChild(img);
    container.appendChild(titulo);
    container.appendChild(descricao);
    container.appendChild(preco);
    container.appendChild(quantidadeLabel);
    container.appendChild(quantidadeInput);
    container.appendChild(button);
} else {
    document.getElementById('product-container').textContent = 'Produto não encontrado.';
}

function adicionarAoCarrinho(produto, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        produto.quantidade = quantidade;
        carrinho.push(produto);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
}