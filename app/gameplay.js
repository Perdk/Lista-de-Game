const express = require("express");
const app = express();

app.use(express.json());

const jogos = [];

// CONTROLE DAS SOMAS DOS IDs
let proximoId = 1;

// FINDINDEX -> RETORNA O INDICE (POSIÇÃO DO OBJETO DO ARRAY)
// UTILIZADO PARA ALTERAR/REMOVER ITEM DO ARRAY

// EX: [
//   { id: 1 FIN -> UTILIZA O ID}, // índice 0 -> FINDINDEX UTILIZA O INDICE
//   { id: 2 }, // índice 1
//   { id: 3 }  // índice 2
// ]

// FIND -> UTILIZADO PARA VER O OBJETO INTEIRO (O ID) EX:
// para cada jogo dentro de jogos:
//     se jogo.id === 2:
//         retorna esse jogo
// É A MESMA COISA QUE FAZER -> jogos.find(function (jogo) {
//   return jogo.id == id;
// });

const localizarId = (id) => {
  return jogos.find((jogo) => jogo.id === id);
};

const localizarIndice = (id) => {
  return jogos.findIndex((jogo) => jogo.id === id);
};

const filtrarJogos = (genero) => {
  return jogos.filter(
    // .toLowerCase() -> TRANSFORMA AS LETAS EM MINUSCULAS
    // EVITA ERROS NA HORA DE REALIZAR OS FILTROS
    (filtrar) => filtrar.genero.toLowerCase() === genero.toLowerCase(),
  );
};

app.get("/jogos", (req, res) => {
  res.status(200).send(jogos);
});

app.get("/jogos/id/:id", (req, res) => {
  // NUMBER PQ NA HORA DE PESQUISAR VEM COMO STRING E DA NULL
  const idGame = Number(req.params.id);
  const verificarId = localizarId(idGame);
  // A FORMA DE VALIDAR FIND É ASSIM
  // CASO NAO ENCONTRE UM OBJETO RETORNA UNDEFINED
  if (verificarId === undefined) {
    return res.status(404).send("O id escolhido não existe");
  }
  res.status(200).send(verificarId);
});

app.get("/jogos/genero/:genero", (req, res) => {
  const { genero } = req.params;
  const resultadoFiltro = filtrarJogos(genero);
  if (resultadoFiltro.length === 0) {
    return res.send("Não há nenhum jogo com o genero escolhido");
  }
  res.status(200).send(resultadoFiltro);
});

app.post("/jogos", (req, res) => {
  // EVITA FAZER UM IF DESSA FORMA ->
  // if ((!req.body.id, !req.body.nome, !req.body.genero, !req.body.status))
  const { nome, genero, status } = req.body;
  if (!nome || !genero || !status) {
    // RETURN FINALIZA A FUNCAO
    // NECESSÁRIO PARA EVITAR BUGS
    return res.status(400).send("Está faltando informações!");
  } else {
    const criarJogo = {
      id: proximoId,
      nome: nome,
      genero: genero,
      status: status,
    };
    jogos.push(criarJogo);
    // SOMA DO ID
    proximoId++;
    return res.status(201).send("Jogo adicionado");
  }
});

app.put("/jogos/id/:id", (req, res) => {
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

app.delete("/jogos/id/:id", (req, res) => {
  const indiceGame = localizarIndice(Number(req.params.id));
  // A FORMA PRA VALIDAR FINDINDEX É ASSIM
  // PRECISA UTILIZAR O -1 (É COMO SE FOSSE O UNDEFINED)
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
