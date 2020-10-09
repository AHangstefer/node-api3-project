const express = require('express');
const dbConfig = require('../data/dbConfig.js');
const { validateUserID, validateUser, validatePost } = require("../middleware/validateUser.js");
const userDb = require("../users/userDb")

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
   userDb.insert(req.body)
      .then((user)=> {
        res.status(201).json(user)
      })
      .catch((err)=> {
        console.log(err)
        return res.status(500).json({
          message: "Error adding user"
        })
      })

});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  userDb.get()
     .then((user)=> res.status(200).json(user))

      .catch((err)=> {
      console.log(err)
      res.status(500).json({
          error: "The users information could not be retrieved"
      })
  })
});

router.get('/:id', validateUserID(), (req, res) => {
   res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserID(), (req, res) => {

  userDb.remove(req.user)
  res.status(200).json({
    message: "Why are you killing lotr characters?"
  })
       
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
