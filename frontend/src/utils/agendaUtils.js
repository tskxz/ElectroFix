export const atualizarAgenda = (state) => {
    localStorage.setItem('agenda', JSON.stringify(state))
    return state
}