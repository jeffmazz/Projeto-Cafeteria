const headerCarrinho = document.querySelector("#headerCarrinho")

const cafesSelecionados = document.querySelector("#selecionados")

const finalizacao = document.querySelector("#finalizacao")

const pedido = []

const cafes = [
    document.getElementsByTagName('p')[5],
    document.getElementsByTagName('p')[6],
    document.getElementsByTagName('p')[7],
    document.getElementsByTagName('p')[8],
    document.getElementsByTagName('p')[9],
    document.getElementsByTagName('p')[10],
    document.getElementsByTagName('p')[11],
    document.getElementsByTagName('p')[12],
    document.getElementsByTagName('p')[13],
    document.getElementsByTagName('p')[14],
    document.getElementsByTagName('p')[15],
    document.getElementsByTagName('p')[16],
    document.getElementsByTagName('p')[17],
    document.getElementsByTagName('p')[18] 
]

cafes.forEach(cafe => {

    const preco = cafe.querySelector("#coffeePrice")
    const tipo = cafe.querySelector("#tipo")
    const menos = cafe.querySelector("#menos")
    const qtd = cafe.querySelector("#qtd")
    const mais = cafe.querySelector("#mais")
    const carrinho = cafe.querySelector("#carrinho")

    mais.addEventListener("click", () => {

        if (qtd.innerHTML >=15) {
            alert("Limite Atingido")
            return
        }

        qtd.innerHTML ++
    })

    menos.addEventListener("click", () => {

        if (qtd.innerHTML <=0) {
            return
        }

        qtd.innerHTML --
    })

    carrinho.addEventListener("click", () => {

        if (qtd.innerHTML == 0 ) {
            return
        }

        pedido.push({
            'qtd' : qtd.innerHTML,
            'tipo' : tipo.innerHTML,
            'preco' : (preco.innerHTML*qtd.innerHTML).toFixed(2)
        })

        qtd.innerHTML = 0
        selecionados()
        end()

    })

})

function selecionados() {

    cafesSelecionados.innerHTML = ""

    pedido.forEach(item => {

        let p = document.createElement("p")

        p.classList.add("selecionados")
        
        p.innerHTML = `<span class='qtdTipo'> ${item.qtd} - ${item.tipo} </span> <button class='selecionadosMenosBtn'> - </button> <button class='selecionadosMaisBtn'> + </button> <span class='selecionadosPrice'> R$ ${item.preco} </span> <button class='selecionadosBtnDelete'> <img src='fotos/trash-can-solid.svg' height='15' width='15' class='svg-trash-can'> </button>`

        let indexOfItem = pedido.indexOf(item)
        let btnMenos = p.querySelector(".selecionadosMenosBtn")
        let btnMais = p.querySelector(".selecionadosMaisBtn")
        let btnDelete = p.querySelector(".selecionadosBtnDelete")

        btnMenos.addEventListener("click", () => {
            
            if (item.qtd == 1) {
                pedido.splice(indexOfItem, 1)
                selecionados()
                end()
                console.log(pedido)
                return
            }

            item.qtd --
            item.preco = (parseFloat(item.preco) - parseFloat(9.90)).toFixed(2)
            selecionados()
            end()
        })

        btnMais.addEventListener("click", () => {

            if (item.qtd == 15) {
                return
            }

            item.qtd ++
            item.preco = (parseFloat(item.preco) + parseFloat(9.90)).toFixed(2)
            selecionados()
            end()
        })

        btnDelete.addEventListener("click", () => {
            pedido.splice(indexOfItem, 1)
            selecionados()
            end()
        })

        cafesSelecionados.appendChild(p)

    })

}

function end() {

    let tot = 0

    pedido.forEach(item => {
        tot += parseFloat(item.preco)
    })

    finalizacao.innerHTML = "<p id='totalPrice'>" + "Total " + "<span class='totalPrice'>" + "R$ " + tot.toFixed(2) + "</span>" + "</p>"

}

/* HEADER CARRINHO */
document.querySelector("#headerCarrinho").addEventListener("click", () => {
    window.scrollTo(0, 1650)
})

/* Endereço */

const form = document.querySelector("#form")
const inputCep = document.querySelector("#cep")
const inputRua = document.querySelector("#rua")
const inputBairro = document.querySelector("#bairro")
const inputCidade = document.querySelector("#cidade")
const inputUF = document.querySelector("#uf")
const formInputs = document.querySelectorAll("[data-input]")

// Validação de Cep

inputCep.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode)

    // Permitir apenas números

    if (!onlyNumbers.test(key)) {
        e.preventDefault()
        return
    }
})

// Pegar evento de endereço

inputCep.addEventListener("keyup", (e) => {

    const inputValue = e.target.value

    // checar se temos a quantidade necessária de dígitos

    if (inputValue.length === 8) {
        pegarEndereço(inputValue)
    }

})

// Obtenção de endereço via API

const pegarEndereço = async (cep) => {
    
    inputCep.blur()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json`

    const response = await fetch(apiUrl)

    const data = await response.json()

    console.log(data)

    // mostrar erro e resetar formulario

    if (data.erro === true) {

        if (!inputRua.hasAttribute("disabled")) {
            toggleDisabled()
        }

        form.reset()
        alert("Endereço Inválido, Tente novamente.")
        return
    }

    if (inputCidade.value == "") {
        toggleDisabled()
    }

    inputRua.value = data.logradouro

    inputBairro.value = data.bairro

    inputCidade.value = data.localidade

    inputUF.value = data.uf

    
}

// adicionar ou remover disabled

const toggleDisabled = () => {

    if (inputUF.hasAttribute('disabled')) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled")
        })
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled")
        })
    }

}

/*   // salvar endereço

form.addEventListener("submit", (e) => {

    e.preventDefault()

    setTimeout(() => {

        alert("Endereço Salvo com Sucesso")

    }, 1500)

})*/