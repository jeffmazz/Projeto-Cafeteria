const headerCarrinho = document.querySelector("#headerCarrinho")

const cafesSelecionados = document.querySelector("#selecionados")

const finalizacao = document.querySelector("#finalizacao")

const pedido = []

const pedidoConcluido = []

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

        qtd.innerHTML ++

    })

    menos.addEventListener("click", () => {

        if (qtd.innerHTML <=0) {
            return
        }

        qtd.innerHTML --
    
    })

    carrinho.addEventListener("click", () => {

        if (qtd.innerHTML == 0) {
            return
        }

        if(pedido.some(p => p.tipo == tipo.innerHTML)) {

            let index = pedido.findIndex(p => p.tipo == tipo.innerHTML)

            let qtdAtual = ((Number.parseFloat(pedido[index].qtd) + Number.parseFloat(qtd.innerHTML)))
            let precoAtual = ((Number.parseFloat(pedido[index].preco) + Number.parseFloat(preco.innerHTML*qtd.innerHTML)).toFixed(2))
            
            pedido[index] = {
                'qtd' : qtdAtual,
                'tipo' : tipo.innerHTML,
                'preco' : precoAtual
            }

            qtd.innerHTML = 0
            notificacaoCarrinho()
            selecionados()
            end()
            return
        }

        pedido.push({
            'qtd' : qtd.innerHTML,
            'tipo' : tipo.innerHTML,
            'preco' : (preco.innerHTML*qtd.innerHTML).toFixed(2)
        })

        qtd.innerHTML = 0
        notificacaoCarrinho()
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
                notificacaoCarrinho()
                selecionados()
                end()
                return
            }

            item.qtd --
            item.preco = (parseFloat(item.preco) - parseFloat(9.90)).toFixed(2)
            selecionados()
            end()
        })

        btnMais.addEventListener("click", () => {
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
    pedidoConcluido[5] = ({'valorTotal' : tot.toFixed(2)})
}

/* HEADER CARRINHO */
document.querySelector("#headerCarrinho").addEventListener("click", () => {
    window.scrollTo(0, 1830)
})

/* Endereço */

const form = document.querySelector("#form")
const inputCep = document.querySelector("#cep")
const inputRua = document.querySelector("#rua")
const inputBairro = document.querySelector("#bairro")
const inputCidade = document.querySelector("#cidade")
const inputNumero = document.querySelector("#numero")
const inputComplemento = document.querySelector("#complemento")
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

inputCep.addEventListener("keyup", () => {

    const inputValue = inputCep.value

    // checar se temos a quantidade necessária de dígitos

    if (inputValue.length === 8) {
        pegarEndereço(inputValue)
    }

})

// Obtenção de endereço via API

const pegarEndereço = async (cep) => {
    
    inputCep.blur()

    resetForm()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json`

    const response = await fetch(apiUrl)

    const data = await response.json()

    // mostrar erro e resetar formulario

    if (data.erro === true) {
        form.reset()
        alert("Endereço Inválido, Tente novamente.")
        inputCep.focus()
        return
    }

    fillForm(data)

}

function fillForm(data) {
    if(data.logradouro) {
        inputRua.value = data.logradouro
    } else {
        inputRua.removeAttribute("disabled")
    }

    inputNumero.removeAttribute("disabled")
    inputComplemento.removeAttribute("disabled")
    
    if(data.bairro) {
        inputBairro.value = data.bairro
    } else {
        inputBairro.removeAttribute("disabled")
    }

    inputCidade.value = data.localidade
    inputUF.value = data.uf
}

function resetForm() {
    form.reset()
    inputRua.setAttribute("disabled","disabled")
    inputNumero.setAttribute("disabled","disabled")
    inputComplemento.setAttribute("disabled","disabled")
    inputBairro.setAttribute("disabled","disabled")
    inputCidade.setAttribute("disabled","disabled")
}

const paymentForm = document.querySelectorAll("input[type=radio]")

paymentForm.forEach(p => {

    addEventListener("click", () => {

        if (p.checked == true) {

            document.querySelector(`.${p.id}`).classList.add("paymentFormChecked")
            pedidoConcluido[4] = ({'paymentFormChecked' : p.id})

        } else {
            
            document.querySelector(`.${p.id}`).classList.remove("paymentFormChecked")

        }

    })

})

document.querySelector("#finalizarPedido").addEventListener("click", () => {

    const rua = document.querySelector("#rua")
    const bairro = document.querySelector("#bairro")
    
    pedidoConcluido[0] = ({'rua' : rua.value})

    if (pedidoConcluido[0].rua == "") {
        alert("Favor preencher endereço")
        return
    }

    pedidoConcluido[1] = ({'uf' : inputUF.value})
    pedidoConcluido[2] = ({'cidade' : inputCidade.value})
    pedidoConcluido[6] = ({'bairro' : bairro.value})

    if (pedidoConcluido[1].uf == "" || pedidoConcluido[2].cidade == "" || pedidoConcluido[6].bairro == "") {
        alert("Cidade, estado ou bairro não informados")
        return
    }

    let inputNumero = document.querySelector("#numero")
    pedidoConcluido[3] = ({'numero' : inputNumero.value})

    if (pedidoConcluido[3].numero == "") {
        alert("Digite o numero da residência")
        return
    } else if (pedidoConcluido[4] == null) {
        alert ("Escolha uma forma de pagamento")
        return
    } else if (pedido.length == 0) {
        alert("Você não selecionou nenhum item")
        return
    }

    pedido.forEach(p => {
        pedidoConcluido.push(p)
    })

    sessionStorage.setItem("pedidoFinal", JSON.stringify(pedidoConcluido))

    window.location.href = "pedidoConcluido.html"

})

function notificacaoCarrinho() {

    if (pedido.length != 0) {
            document.getElementById("headerCarrinho").src = "fotos/carrinhoN pixlrX.png"
            document.getElementsByTagName("img")[1].classList.add("headerCarrinho")
    } else {
        document.getElementById("headerCarrinho").src = "fotos/carrinho.png"
        document.getElementsByTagName("img")[1].classList.remove("headerCarrinho")
    }

}

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY

    if (scrollY > 1510) {

        if(headerCarrinho.style.opacity < 1) return
        
        let opacityValue = 0.5;
      
        let intervalId = setInterval(fadeOutGradualmente, 100);
      
        function fadeOutGradualmente() {
          if (opacityValue > 0) {
            opacityValue -= 0.1
            headerCarrinho.style.opacity = opacityValue
          } else {
            clearInterval(intervalId)
          }
        }

    } else {
        
        if(headerCarrinho.style.opacity > 0) return
        
        let opacityValue = 0.5

        let intervalId = setInterval(fadeInGradualmente,100)

        function fadeInGradualmente() {
            if (opacityValue < 1) {
                opacityValue += 0.1
                headerCarrinho.style.opacity = opacityValue
            } else {
                clearInterval(intervalId)
            }
        }

    }
    
})