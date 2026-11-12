const usuariosSelect = document.getElementById("usuario")
const mensagem = document.getElementById("mensagem")
const postagem = document.getElementById("postagem")

fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (dadosUsuarios) {
        return dadosUsuarios.json()
    })

    .then(function (usuarios) {
        usuarios.forEach(function (usuario) {
            const opcao = document.createElement("option")
            opcao.value = usuario.id
            opcao.textContent = usuario.name
            usuariosSelect.appendChild(opcao)
        });
    })

    .catch(function () {
        mensagem.textContent = "Não foi possível carregar os Usuários!"
    })

usuariosSelect.addEventListener("change", function () {
    postagem.innerHTML = ""

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuariosSelect.value}`)
        .then(function (dadosPost) {
            return dadosPost.json()
        })

        .then(function (postagens) {
            postagens.forEach(function(post) {
                const item = document.createElement("li")
                const titulo = document.createElement("button")
                const detalhes = document.createElement("div")
                detalhes.hidden = true

                titulo.textContent = post.title

                titulo.addEventListener("click", function () {
                    if(detalhes.hidden){
                        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
                        .then(function (dadosPostCompleta) {
                            return dadosPostCompleta.json()
                        })

                        .then(function (postCompleto) {
                            detalhes.hidden = false
                            detalhes.innerHTML = ""

                            const texto = document.createElement("p")
                            texto.textContent = postCompleto.body
                            detalhes.appendChild(texto)

                            const tituloComentario = document.createElement("h3")
                            tituloComentario.textContent = "Comentario:"
                            detalhes.appendChild(tituloComentario)

                            const comentarios = document.createElement("ul")
                            detalhes.appendChild(comentarios)

                            fetch(`https://jsonplaceholder.typicode.com/posts/${postCompleto.id}/comments`)
                                .then(function(dadosComentarios) {
                                    return dadosComentarios.json()
                                })

                                .then(function(comentario) {
                                    console.log(comentario)
                                    comentario.forEach(function(coment) {
                                        const lista = document.createElement("li")
                                        lista.textContent = `${coment.name}: ${coment.body}`
                                        comentarios.appendChild(lista)
                                    })
                                })
                        })

                        .catch(function() {
                            detalhes.textContent = "Não foi possível carregar a postagem ou os comentários.";
                        })
                    } else {
                        detalhes.hidden = true
                    }
                    
                })

                item.appendChild(titulo)
                item.appendChild(detalhes)
                postagem.appendChild(item)
            })


        })

        .catch(function() {
            mensagem.textContent = "Não foi possível carregar as postagens.";
        })
})