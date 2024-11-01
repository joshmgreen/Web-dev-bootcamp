import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', async (req, res) => {
  const { username: email, password } = req.body;

  try {
    // Check if email already exists in the database
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      // Send a 409 Conflict status if the email already exists
      return res
        .status(409)
        .json({ message: 'Email already exists. Try logging in.' });
    }

    // Insert new user into the database
    await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
      email,
      password,
    ]);

    // Send a 201 Created status and render the secrets page
    res.status(201).render('secrets.ejs');
  } catch (err) {
    console.error('Database error:', err);

    // Send a 500 Internal Server Error if something goes wrong
    res
      .status(500)
      .json({ message: 'An error occurred while registering the user.' });
  }
});

app.post('/login', async (req, res) => {
  const { username: email, password } = req.body;

  try {
    // Check if the user exists in the database
    const results = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (results.rows.length > 0) {
      const user = results.rows[0];
      const storedPassword = user.password;

      // Check if the provided password matches the stored password
      if (password === storedPassword) {
        // Return a 200 OK status and render the secrets page on successful login
        return res.status(200).render('secrets.ejs');
      } else {
        // Send a 401 Unauthorized status for an incorrect password
        return res.status(401).json({ message: 'Incorrect Password' });
      }
    } else {
      // Send a 404 Not Found status if the email does not exist
      return res
        .status(404)
        .json({ message: 'Email not found. Please register first.' });
    }
  } catch (err) {
    console.error('Unable to perform login:', err);

    // Send a 500 Internal Server Error if something goes wrong
    res
      .status(500)
      .json({ message: 'An error occurred while trying to log in.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
