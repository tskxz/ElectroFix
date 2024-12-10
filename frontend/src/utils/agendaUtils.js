const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const atualizarAgenda = (state) => {
    // Preco de deslocamento
    state.precoDeslocamento = 20.99;

    // Calcular o preco da taxa
    state.precoTaxa = addDecimals(Number((0.15 * state.precoDeslocamento).toFixed(2)))
    
    // Calcular o preco total
    state.precoTotal = (Number(state.precoDeslocamento) + Number(state.precoTaxa)).toFixed(2)
    
    localStorage.setItem('agenda', JSON.stringify(state))
    return state
}