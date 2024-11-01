import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));

let userIsAuthorized = false;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(passwordCheck);

function passwordCheck(req, res, next) {
  const password = req.body['password'];
  if (password === 'ILoveProgramming') {
    userIsAuthorized = true;
  }
  next();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  if (userIsAuthorized) {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.sendFile(__dirname + '/public/index.html');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
