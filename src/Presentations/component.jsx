const createPresentationsPage = (navigator, update) => {
    return {
        view: ({ attrs: { model } }) => {
            <span>{model}</span>
        }
    }
}