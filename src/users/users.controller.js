const xml2js = require('xml2js');

const usersService = require('./users.service');
const mockedUsers = require('../core/mock-data');

class UsersController {
  find = (req, res) => {
    if (req.params.id) {
      return res.send(mockedUsers.find((user) => user.id === Number(req.params.id)));
    }

    return res.send(mockedUsers);
  };

  create = (req, res) => {
    const user = req.body;
    mockedUsers.push(user);
    res.send(user);
  };

  createFromFile = (req, res) => {
    const { users } = req.body;

    const normalizedResponse = usersService.normalizeResponse(users.user, mockedUsers);

    res.send(normalizedResponse);
  };

  exportToXml = async (req, res) => {
    const filePath = 'users.xml';
    const builder = new xml2js.Builder();
    const usersInXml = builder.buildObject({ users: { user: mockedUsers } });

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${filePath}`,
    });
    res.write(usersInXml);
    res.end();
  };
}

module.exports = new UsersController();
