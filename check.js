const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { key } = req.query;
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'licenses.json')));
  const found = data.find(entry => entry.key === key);

  if (!found || !found.active) {
    return res.status(403).json({ valid: false });
  }

  return res.status(200).json({ valid: true, owner: found.owner });
};