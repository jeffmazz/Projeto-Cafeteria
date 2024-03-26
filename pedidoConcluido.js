window.addEventListener("load", () => {

    let sessionStorageJSONstringify = sessionStorage.getItem('pedidoFinal')

    let sessionStorageJSONparse = JSON.parse(sessionStorageJSONstringify)

    document.querySelector("#enderecoEntrega").innerHTML += `<span id="a2"> ${sessionStorageJSONparse[0].rua}, N° ${sessionStorageJSONparse[3].numero} </span> <span id="a3"> ${sessionStorageJSONparse[6].bairro}</span> <span id="a4"> ${sessionStorageJSONparse[2].cidade} - ${sessionStorageJSONparse[1].uf} </span>`

    document.querySelector("#pagamentoEntrega").innerHTML += `<span id="b3"> ${sessionStorageJSONparse[4].paymentFormChecked} </span>`

    document.querySelector("#valorTotalEntrega").innerHTML += `<span id="c3"> R$ ${sessionStorageJSONparse[5].valorTotal} </span>`

    

    for (indexOfSessionStorage = 7 ; indexOfSessionStorage < sessionStorageJSONparse.length ; indexOfSessionStorage++) {

        let p = document.createElement("p")

        p.innerHTML = `${sessionStorageJSONparse[indexOfSessionStorage].qtd} - ${sessionStorageJSONparse[indexOfSessionStorage].tipo}`

        p.classList.add("cafesSelecionadosParaEntrega")

        document.querySelector("#cafesSelecionadosParaEntrega").appendChild(p)

    }
})