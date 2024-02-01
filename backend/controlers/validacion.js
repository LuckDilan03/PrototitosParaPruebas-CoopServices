const path = require('path');

const mostrardashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dashboard/'));
  };

  module.exports = {mostrardashboard};