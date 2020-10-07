const express = require('express');
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")
//const morgan = require("morgan")
const logger = require("./middleware/logger")

const server = express();
const port = 3000;

server.use(express.json());
//custom middleware from guided project
//this was moved into the logger file
server.use(logger("short"));
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);
//server.use(morgan("combined"))

server.listen(port, ()=> {
  console.log(`Server running at http://localhost:${port}`)
});

module.exports = server

//custom middleware
//build before following guided 
// not moved, commented out

// function logger(req, res, next) {
//   const date = new Date().toString();
//   const url = req.url;
//   const method = req.method;
//   console.log(`${date} -- ${method} -- ${url}`);
//   next();
// }


// server.get('/', (req, res) => {
//   res.status(200).json({
//     message: `This is my custom middleware from server ${process.env.COHORT}`,
//     fact: process.env.FUN_FACT || "most people think the sky is blue",
//   })
// });