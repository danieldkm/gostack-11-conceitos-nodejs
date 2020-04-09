const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const likes = 0;
  const repositorie = {
    id: uuid(),
    url, title, techs, likes
  }

  repositories.push(repositorie)
  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { url, title, techs } = request.body;

  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if(index < 0) {
    return response.status(400).json({error: 'Repositorie not found'});
  }

  const repositorie = {
    id,
    url, title, techs
  }
  const newRepositorie = Object.assign(repositories[index], repositorie)
  repositories[index] = newRepositorie;
  return response.json(newRepositorie)
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if(index < 0) {
    return res.status(400).json({error: 'Repositorie not found!'})
  }

  repositories.splice(index, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if(index < 0) {
    return response.status(400).json({error: 'Repositorie not found!'})
  }

  const repositorie = repositories[index];
  repositorie.likes ++;
  
  return response.status(200).json(repositorie)
});

module.exports = app;
