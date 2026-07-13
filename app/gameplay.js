const express = require("express");
const app = express();

app.use(express.json());

const jogos = [];

let proximoId = 1;

// CONTROLE DAS SOMAS DOS IDs
const localizarId = (id) => {
  return jogos.find((jogo) => jogo.id === id);
};

const localizarIndice = (id) => {
  return jogos.findIndex((jogo) => jogo.id === id);
};

const filtrarJogos = (genero) => {
  return jogos.filter(
    (filtrar) => filtrar.genero.toLowerCase() === genero.toLowerCase(),
  );
};

app.get("/jogos", (req, res) => {
  res.status(200).send(jogos);
});

app.get("/jogos/:genero", (req, res) => {
  const { genero } = req.params;
  const resultadoFiltro = filtrarJogos(genero);
  res.status(200).send(resultadoFiltro);
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
});
