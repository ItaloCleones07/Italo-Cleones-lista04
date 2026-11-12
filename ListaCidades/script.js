const estadoSelect = document.getElementById("estado")
const cidadeSelect = document.getElementById("cidade")
const mensagem = document.getElementById("mensagem")

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(function(dadosEstados) {
        if(dadosEstados.erro) {
            mensagem.textContent = "Não foi possível buscar os estados!"
        }

        return dadosEstados.json()
    })

    .then(function(estados) {
        estados.sort(function(a, b) {
            return a.nome.localeCompare(b.nome, "pt-BR")
        })

        estados.forEach(function(item) {
          const opcao = document.createElement("option")
          opcao.value = item.sigla
          opcao.textContent = item.nome
          estadoSelect.appendChild(opcao)
        });
    })

    .catch(function() {
        mensagem.textContent = "Não foi possível carregar os estados."
    })

estadoSelect.addEventListener("change", function() {
    const siglaEstado = estadoSelect.value

    console.log(siglaEstado)

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`)
        .then(function(dadosCidades) {
            if(dadosCidades.erro) {
                mensagem.textContent = "Não foi possível buscar as cidades!"
            }

            return dadosCidades.json()
        })

        .then(function(cidades){
            cidadeSelect.options.length = 0;
            cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>'

            cidades.forEach(function(item) {
                const opcao = document.createElement("option")
                opcao.value = item.nome
                opcao.textContent = item.nome
                cidadeSelect.appendChild(opcao)
            })
        })

        .catch(function() {
            mensagem.textContent = "Não foi possível carregar as cidades."
        })
})

cidadeSelect.addEventListener("change", function() {
    const estado = estadoSelect.options[estadoSelect.selectedIndex].textContent

    mensagem.textContent = `Você selecionou: ${cidadeSelect.value} - ${estado}`
})