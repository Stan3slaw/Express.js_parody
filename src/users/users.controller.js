const users = require('../core/mock-data');

const find = (req, res) => {
  if (req.params.id) {
    return res.send(users.find((user) => user.id === Number(req.params.id)));
  }

  return res.send(users);
};

const create = (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(user);
};

module.exports = {
  find,
  create,
};
