const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/paseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {

    const {github_username, techs, latitude, longitude} = request.body;

    //Verificando se já existe um usuário cadastrado com o github username para evitar duplicação de registros
    let dev = await Dev.findOne({github_username});

    if (!dev) {

      //await serve para parar e esperar até a requisição terminar
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const {name = login, avatar_url, bio} = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });


      //Filtrar as conexões e vai procurar os Dev que satisfação as condições.
      // Ex: 10km e possuam pelo menos 1 techonolgias cadastradas
      const sendSocketMessageTo = findConnections(
        {latitude, longitude},
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);

    }

    return response.json(dev);
  },
}