const express = require('express');
const postRouter = require("./posts/postRouter")
const userRouter = requre("./users/userRouter")

const server = express();

//custom middleware
function logger(req, res, next) {
  const date = new Date().toString();
  const url = req.url;
  const method = req.method;
  console.log(`${date} -- ${method} -- ${url}`);

  next();

}
server.use(logger);
server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);




server.get('/', (req, res) => {
  res.status(200).json({
    message: `This is my custom middleware from server ${process.env.COHORT}`,
    fact: process.env.FUN_FACT || "most people think the sky is blue",
  })
});

module.exports = server;
