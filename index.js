const axios = require("axios");
// const connection = require('./db');
const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

// connection.connect((err) => {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//   } else {
//     console.log('connected to database with threadId :  ' + connection.threadId);
//   }
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

axios
  .get("https://api.github.com/users/torvalds/repos", {
    headers: {
      Authorization: `token ${process.env.GIT_TOKEN_KEY}`,
    },
  })
  .then((res) => {
    const userRepos = res.data;
    connection.query(
      "INSERT INTO repositories (id, url, user_id) VALUES (?, ?, ?)",
      [
        {
          id: userRepos.id,
          url: userRepos.html_url,
          user_id: userRepos.owner.id,
        },
      ]
    );
  })
  .then((res) => {
    const id = res.insertId;
    const newRepo = { id, url, user_id };
    res.status(201).json(newRepo);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the user");
  });
