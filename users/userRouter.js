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

router.post('/:id/posts', validateUser(), validatePost(), (req, res) => {
  /// this is also not working
  // const {id} = req.params;
  // const post = {...req.body, post_id: id };
  //   userDb.insert(post)
  //     .then((post)=> {
  //       userDb.getUserPosts(post.id)
  //       .then(post => {
  //         res.status(201).json({post})
  //       })
  //       .catch(err => { res.status(500).json(err)})
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

router.get('/:id/posts', validateUserID(), (req, res) => {
  id = req.params.id
  userDb.getUserPosts(req.user.id)
    .then((posts)=> {
      res.status(200).json(posts)
    })

});

router.delete('/:id', validateUserID(), (req, res) => {
  userDb.remove(req.user)
    .then(() =>{
      res.status(200).json({
        message: "Why are you killing lotr characters?"
    })
})
       
});

router.put('/:id', validateUserID(), (req, res) => {
 ///// this is not working
  const {id} = req.params
  try{
   userDb.update(id, req.body)
   res.status(200).json({
        message: "User with the id ${id} has been updated" })
   } catch (error) {
     next(error)
   }
   
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
