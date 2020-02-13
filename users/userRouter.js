const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'There was an error while saving this user to the database' })
  })
});

router.post('/:id/posts', validateUserID, validatePost, (req, res) => {
  console.log('in post')
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err => {
        console.log(err)
        res.status(500).json({ error: 'There was an error while saving this post to the database' })
      })
    })
});

router.get('/', (req, res) => {
  console.log('get root')
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error retrieving the users' })
    })
});

router.get('/:id', validateUserID, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserID, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error retrieving the user" })
    })
});

router.delete('/:id', validateUserID, (req, res) => {
  Users.remove(req.params.id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'The post could not be removed'})
    })
});

router.put('/:id', validateUserID, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: 'User cannot be updated' })
    })
});

//custom middleware
function validateUserID (req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      user ? (req.user = user) & next() : 
      res.status(400).json({ message: "Error retrieving the user" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error retrieving the user" })
    })
}

function validateUser(req, res, next) {
  console.log(req.body.name)
  if(!req.body.name){
    res.status(400).json({ errorMessage: 'User does not have a name' })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  req.body = {...req.body, user_id: req.params.id}
  if(!req.body.text){
    res.status(400).json({ errorMessage: 'Post does not have a text' })
  }else{
    next()
  }
}

module.exports = router;
