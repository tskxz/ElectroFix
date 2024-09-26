const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const atualizarCarrinho = (state) => {
    // Calcular o preco dos itens
    state.precoItens = addDecimals(state.carrinhoItens.reduce((acc, item) => acc * item.preco * item.quantidade, 0))

    // Calcular o preco do envio (se a encomenda for mais de 100 euros, é de graça, se não, 20 euros preco de envio)
    state.precoEnvio = addDecimals(state.precoItens > 100 ? 0 : 20)

    // Calcular o preco da taxa
    state.precoTaxa = addDecimals(Number((0.15 * state.precoItens).toFixed(2)))

    // Calcular o preco total
    state.precoTotal = (Number(state.precoItens) + Number(state.precoEnvio) + Number(state.precoTaxa)).toFixed(2)

    localStorage.setItem('carrinho', JSON.stringify(state))

    return state
}