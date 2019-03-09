var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');

/* Get customers list */
router.get('/', function (req, res, next) {
  Customer.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* Get single customer by ID */
router.get('/:id', function (req, res, next) {
  Customer.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Save customer record */
router.post('/', function (req, res, next) {
  Customer.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Update customer details */
router.put('/:id', function(req, res, next) {
 Customer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
   if (err) return next(err);
   res.json(post);
 });
});

/* Delete customer record */
router.delete('/:id', function(req, res, next) {
 Customer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
   if (err) return next(err);
   res.json(post);
 });
});

module.exports = router;
