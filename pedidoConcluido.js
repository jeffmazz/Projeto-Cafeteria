window.addEventListener("load", () => {

    let sessionStorageJSONstringify = sessionStorage.getItem('pedidoFinal')
    let sessionStorageJSONparse = JSON.parse(sessionStorageJSONstringify)
    console.log(sessionStorageJSONparse)
    
})