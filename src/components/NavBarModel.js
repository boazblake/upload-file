export const createAction = navigator => ({ dest, params }) => {
    console.log(navigator)
    console.log(dest, params)
    return navigator.navigateTo(dest, params)
}