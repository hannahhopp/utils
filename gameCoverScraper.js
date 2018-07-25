/*
    This was written to acquire JSONs about random games available on IGDB. 
    Its intent was to get the URLs for the game cover art for a group project 
    where we designed a fake online store selling video games.

    Acquire your API key here: https://www.igdb.com/api
*/

const axios = require('axios');
const fs = require('fs');
let gameArr = [];

const fetch = async () => {
  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < 10; i++) {
      let random = Math.round(Math.random() * 5000);
      let req = {
        method: 'GET',
        url: `${random}`,
        baseURL: 'https://api-2445582011268.apicast.io/games/',
        headers: {
          'Accept': 'application/json',
          'user-key': 'YOUR_API_KEY'
        }
      }
        gameArr.push(axios.request(req));
    }
  }

  await Promise.all(gameArr)
    .then(res => {
      return res.map(elem => elem.data);
    })
    .then(games => {
      let resolvedGames = [];
      games.forEach(game => {
        let [gameSpread] = game;
        if (gameSpread.name) {
          let infoIWant = {
            title: gameSpread.name,
            description: gameSpread.summary,
            imageUrl: gameSpread.cover.url,
          }
          resolvedGames.push(infoIWant);
        }
      });
      fs.appendFileSync('games.json', JSON.stringify(resolvedGames));
    })
    .catch(err => 'Oops!');
}

fetch();