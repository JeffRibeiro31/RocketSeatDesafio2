const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //Interação 2
  response.send(repositories)
});


app.post("/repositories", (request, response) => {
  // Interação 1

  const {title, url, techs} = request.body;
  const item = {
    id: uuid(),
     title,
      url,
       techs,
        likes:0};

  repositories.push(item);

  return response.json(item);

});



app.put("/repositories/:id", (request, response) => {

  //Interação 3
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repositoriesIndex = repositories.findIndex(item => item.id === id);

  if(repositoriesIndex < 0){
    return response.status(400).json({error:'Item not found in repository'});
  }

  if(repositoriesIndex === -1) {
    return response.status(400).json({error:'Rep does not exist'});
  }

const item ={
  id: uuid(),
  title,
  url,
  techs,
  likes: repositories[repositoriesIndex].likes,
}

  repositories[repositoriesIndex] = item;

  return response.json(item);



  
});





app.delete("/repositories/:id", (request, response) => {
  // Interação 4
  const {id} = request.params;
  const repositoriesIndex = repositories.findIndex(item => item.id === id);

  if(repositoriesIndex < 0){
    return response.status(400).json({error:'Item not found in repository'});
  }

 

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();

});









app.post("/repositories/:id/like", (request, response) => {
  // Interação 5
  const { id } = request.params;
  const { likes } = request.body;
  const repositoriesIndex = repositories.findIndex(item => item.id === id);

  if(repositoriesIndex < 0){
    return response.status(400).json({error:'Item not found in repository'});
  }

  if(!repositoriesIndex === -1) {
    return response.status(400).json({error:'Rep does not exist'});
  }


  repositories[repositoriesIndex].likes +=1;

  
  return response.json(repositories[repositoriesIndex]);


});

module.exports = app;
