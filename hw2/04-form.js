const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));

// Display the form
app.get('/form', (req, res) => {
  res.send(`
    <h1>Contact Form</h1>
    <form action="/submit" method="POST">
      <label>Username:</label><br>
      <input type="text" name="username"><br><br>

      <label>Email:</label><br>
      <input type="email" name="email"><br><br>

      <label>Comments:</label><br>
      <textarea name="comments"></textarea><br><br>

      <label>
        <input type="checkbox" name="newsletter">
        Sign up for the newsletter
      </label><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle the submitted form
app.post('/submit', (req, res) => {
  const { username, email, comments, newsletter } = req.body;

  res.send(`
    <h1>Submitted Information</h1>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Comments:</strong> ${comments}</p>
    <p><strong>Newsletter:</strong> ${newsletter ? "Yes" : "No"}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
