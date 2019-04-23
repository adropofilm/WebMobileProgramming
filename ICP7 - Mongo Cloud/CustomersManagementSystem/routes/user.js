var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* Get User list */
router.get('/', function (req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get single User by ID */
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save User record */
router.post('/', function (req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update User details */
router.put('/:id', function(req, res, next) {
 User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
   if (err) return next(err);
   res.json(post);
 });
});

/* Delete User record */
router.delete('/:id', function(req, res, next) {
 User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
   if (err) return next(err);
   res.json(post);
 });
});

module.exports = router;
