const campoCep = document.getElementById("cep")
const botaoBuscar = document.getElementById("buscar")
const formulario = document.getElementById("formulario")
const mensagem = document.getElementById("mensagem")
const endereco = document.getElementById("endereco")

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault()
    endereco.hidden = true
    
    const cep = campoCep.value.trim()

    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP válido (8 dígitos)!"
        return;
    }

    try {
        const apiCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const dados = await apiCep.json()
        console.log(dados)

        if(dados.erro) {
            mensagem.textContent = "CEP não encontrado!"
            return;
        }

        mensagem.textContent = "Endereço encontrado!!"

        document.getElementById("rua").textContent = dados.logradouro
        document.getElementById("bairro").textContent = dados.bairro
        document.getElementById("cidade").textContent = dados.localidade
        document.getElementById("uf").textContent = dados.uf

        endereco.hidden = false
    } catch {
        mensagem.textContent = "Não foi possível buscar o CEP. Verifique sua conexão."
    }
})