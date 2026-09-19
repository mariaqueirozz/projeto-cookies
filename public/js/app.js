if (document.getElementById("loginForm")) {
    document
        .getElementById("loginForm")
        .addEventListener("submit", async (event) => {

            event.preventDefault();

            const login = document.getElementById("login").value;
            const senha = document.getElementById("senha").value;

            const resposta = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login,
                    senha
                })
            });

            const dados = await resposta.json();

            document.getElementById("mensagem").textContent =
                dados.mensagem;
        });
}

if (document.getElementById("usuario")) {
    carregarUsuario();
}

async function carregarUsuario() {

    const resposta = await fetch("/usuario");

    if (resposta.status === 401) {
        window.location.href = "/";
        return;
    }

    const usuario = await resposta.json();

    document.getElementById("usuario").textContent =
        `Olá, ${usuario.nome}`;
}

if (document.getElementById("logout")) {
    document
        .getElementById("logout")
        .addEventListener("click", async () => {

            await fetch("/logout", {
                method: "POST"
            });

            window.location.href = "/";
        });
}