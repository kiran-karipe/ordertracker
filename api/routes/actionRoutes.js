'use strict';
module.exports = function(app) {
  var todoList = require('./../controllers/actionController');

  // todoList Routes
  app.route('/track')
    .post(todoList.index)
}
