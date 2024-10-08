let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const container = document.getElementById('cart-container');
    container.innerHTML = '';
    let total = 0;

    if (carrinho.length > 0) {
        carrinho.forEach(produto => {
            const item = document.createElement('div');
            item.className = 'cart-item';

            const img = document.createElement('img');
            img.src = produto.imagem;
            img.alt = produto.titulo;

            const titulo = document.createElement('h2');
            titulo.textContent = produto.titulo;

            const quantidade = document.createElement('p');
            quantidade.textContent = `Quantidade: ${produto.quantidade}`;

            const preco = document.createElement('p');
            preco.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;

            const subtotal = document.createElement('p');
            subtotal.textContent = `Subtotal: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;

            const removerButton = document.createElement('button');
            removerButton.className = 'btn-remover';
            removerButton.textContent = 'Remover';
            removerButton.onclick = () => removerDoCarrinho(produto.id);

            item.appendChild(img);
            item.appendChild(titulo);
            item.appendChild(quantidade);
            item.appendChild(preco);
            item.appendChild(subtotal);
            item.appendChild(removerButton);
            container.appendChild(item);

            total += produto.preco * produto.quantidade;
        });

        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
        container.appendChild(totalElement);

        const finalizarButton = document.createElement('button');
        finalizarButton.className = 'btn-finalizar';
        finalizarButton.textContent = 'Finalizar Compra';
        finalizarButton.id = 'finalizar-compra';
        container.appendChild(finalizarButton);
    } else {
        container.textContent = 'Seu carrinho está vazio!';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();

    document.getElementById('clear-storage').addEventListener('click', () => {
        localStorage.clear();
        alert('Carrinho limpo!');
        carrinho = [];
        renderizarCarrinho();
    });


document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert('Obrigado por comprar conosco!');
    });
});
