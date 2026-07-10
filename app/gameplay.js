const express = require("express");
const app = express();

app.use(express.json());

const jogos = [];

// CONTROLE DAS SOMAS DOS IDs
let proximoId = 1;

const localizarId = (id) => {
  return jogos.find((jogo) => jogo.id === id);
};

const localizarIndice = (id) => {
  return jogos.findIndex((jogo) => jogo.id === id);
};

app.get("/jogos", (req, res) => {
  res.status(200).send(jogos);
  g;
});

app.get("/jogos/:id", (req, res) => {
  // NUMBER, POIS, NA HORA DE PESQUISAR VEM COMO STRING E DA NULL
  const idGame = Number(req.params.id);
  const verificarId = localizarId(idGame);

  if (verificarId === undefined) {
    return res.status(404).send("O id escolhido não existe");
  }
  return res.status(200).send(verificarId);
});

app.post("/jogos", (req, res) => {
  const { nome, genero, status } = req.body;
  if (!nome || !genero || !status) {
    return res.status(400).send("Está faltando informações!");
  } else {
    const criarJogo = {
      id: proximoId,
      nome: nome,
      genero: genero,
      status: status,
    };
    jogos.push(criarJogo);
    proximoId++;
    return res.status(201).send("Jogo adicionado");
  }
});

app.put("/jogos/:id", (req, res) => {
  const indiceGame = localizarIndice(Number(req.params.id));
  const { nome, genero, status } = req.body;
  if (!nome || !genero || !status) {
    return res.status(400).send("Está faltando informações");
  } else {
    jogos[indiceGame].nome = nome;
    jogos[indiceGame].genero = genero;
    jogos[indiceGame].status = status;
  }
  res.status(200).send("Alteração realizada");
});

app.delete("/jogos/:id", (req, res) => {
  const indiceGame = localizarIndice(Number(req.params.id));
  if (indiceGame === -1) {
    return res
      .status(404)
      .send("ID não encontrado, não foi possivel deletar o jogo");
  }
  jogos.splice(indiceGame, 1);
  res.status(200).send("Jogo deletado!");
});

app.listen(3031, () => {
  console.log("Servidor on");
  {
  }
});
