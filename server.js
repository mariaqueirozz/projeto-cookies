const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

const JWT_SECRET = "uma-chave-secreta";

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const usuarios = [
    {
        id: 1,
        nome: "Ana Silva",
        login: "ana",
        senha: "123"
    },
    {
        id: 2,
        nome: "Carlos Souza",
        login: "carlos",
        senha: "456"
    }
];

app.post("/login", (req, res) => {
    const { login, senha } = req.body;

    const usuario = usuarios.find(
        u => u.login === login && u.senha === senha
    );

    if (!usuario) {
        return res.status(401).json({
            mensagem: "Login ou senha inválidos"
        });
    }

    const token = jwt.sign(
    {
        id: usuario.id,
        nome: usuario.nome,
        login: usuario.login
    },
    JWT_SECRET,
    {
        expiresIn: "30m"
    }
);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 30 * 60 * 1000
    });

    res.json({
        mensagem: "Login realizado com sucesso"
    });
});

function autenticar(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            mensagem: "Não autenticado"
        });
    }

    try {
        const dados = jwt.verify(token, JWT_SECRET);

        req.usuario = dados;

        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
}

app.get("/usuario", autenticar, (req, res) => {
    res.json({
        id: req.usuario.id,
        nome: req.usuario.nome,
        login: req.usuario.login
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");

    res.json({
        mensagem: "Logout realizado"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});