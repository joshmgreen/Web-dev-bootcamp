import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://secrets-api.appbrewery.com/';

// Register with the secrets API to get your own values
// https://secrets-api.appbrewery.com/
const yourUsername = '';
const yourPassword = '';
const yourAPIKey = '';
const yourBearerToken = '';

app.get('/', async (req, res) => {
  res.render('index.ejs', { content: 'API Response.' });
});

app.get('/noAuth', async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'random');
    const result = JSON.stringify(response.data);
    res.render('index.ejs', { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get('/basicAuth', async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'all?page=2', {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = JSON.stringify(response.data);
    res.render('index.ejs', { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get('/apiKey', async (req, res) => {
  try {
    const response = await axios.get(
      API_URL + 'filter?score=5&apiKey=' + yourAPIKey
    );
    const result = JSON.stringify(response.data);
    res.render('index.ejs', { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get('/bearerToken', async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'secrets/42', {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = JSON.stringify(response.data);
    res.render('index.ejs', { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
