import express from 'express';
import bodyParser from 'body-parser';
import pokemon from 'pokemontcgsdk';
import dotenv from 'dotenv';

dotenv.config();
pokemon.configure({ apiKey: process.env.API_KEY });

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

function getRandomLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

app.get('/', async (req, res) => {
  const randomLetter = getRandomLetter();
  pokemon.card
    .where({ q: `name:${randomLetter}*` })
    .then((result) => {
      if (result.data.length > 0) {
        const randomCardIndex = getRandomIndex(result.data.length);
        const randomCard = result.data[randomCardIndex];
        res.render('index.ejs', {
          imageUrl: randomCard.images.large,
        });
      } else {
        res.status(404).send('No cards found');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error fetching card data');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
