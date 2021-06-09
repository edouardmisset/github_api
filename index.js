const axios = require('axios');
// const connection = require('./db');
const express = require('express');
const app = express();
const { getUsers, setRepo } = require('./connexion');
require('dotenv').config();

const port = process.env.PORT;

// connection.connect((err) => {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//   } else {
//     console.log('connected to database with threadId :  ' + connection.threadId);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

async function main() {
  // get users
  const userList = await getUsers();
  // get repo info
  userList.forEach(async user => {
    try {
      const response = await axios.get(
        'https://api.github.com/users/' + user.github_username + '/repos',
        {
          headers: {
            Authorization: `token ${process.env.GIT_TOKEN_KEY}`,
          },
        }
      );
      const repoList = await response.data;
      // set repo info
      const result = await setRepo(repoList);
      console.log(result);
      console.log(`all repos for ${user.github_username} synced to db`);
    } catch (error) {
      console.error(error);
    }
  });
}

main();
