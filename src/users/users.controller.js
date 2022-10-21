const xml2js = require('xml2js');

const usersService = require('./users.service');
const mockedUsers = require('../core/mock-data');

const find = (req, res) => {
  if (req.params.id) {
    return res.send(mockedUsers.find((user) => user.id === Number(req.params.id)));
  }

  return res.send(mockedUsers);
};

const create = (req, res) => {
  const user = req.body;
  mockedUsers.push(user);
  res.send(user);
};

const createFromFile = (req, res) => {
  const { users } = req.body;

  const normalizedResponse = usersService.normalizeResponse(users.user, mockedUsers);

  res.send(normalizedResponse);
};

const exportToXml = (req, res) => {
  const filePath = 'users.xml';
  const builder = new xml2js.Builder();
  const usersInXml = builder.buildObject({ users: { user: mockedUsers } });

  usersService.exportUsersToXml(req, res, usersInXml, filePath);
};

module.exports = {
  find,
  create,
  createFromFile,
  exportToXml,
};
