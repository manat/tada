var db = require('../db');

/*
 * GET tasks listing.
 */

exports.list = function(req, res, next) {
  res.render('list', { title: 'Tasks', tasks: db.tasks });
};

exports.create = function(req, res, next) {
  console.log(req.body);
  var task = req.body.task;
  db.tasks.push({ name: task.name, id: task.id });
  // res.render('list', { title: 'Create Tasks', tasks: db.tasks });
  res.json({ tasks: db.tasks });
}