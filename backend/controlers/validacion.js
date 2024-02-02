const path = require('path');

const mostrardashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dashboard/index.html'));
  };

  module.exports = {mostrardashboard};