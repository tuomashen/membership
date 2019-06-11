var Item = require('../models/itemModel');

// Display list of all items.
exports.list = function(req, res, next) {

  res.render('items', {
    items: Item
  });

};
