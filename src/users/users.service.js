const fs = require('fs');
const path = require('path');

const normalizeResponse = (users, mockedUsers) => {
  let normalizedUsers;
  if (Array.isArray(users)) {
    normalizedUsers = users.map((user) => ({ ...user, id: Number(user.id) }));
    mockedUsers.push(...normalizedUsers);
  } else {
    normalizedUsers = { ...users, id: Number(users.id) };
    mockedUsers.push(normalizedUsers);
  }

  return normalizedUsers;
};

const exportUsersToXml = (_, res, usersInXml, filePath) => {
  const ws = fs.createWriteStream(filePath, 'utf-8');
  ws.write(usersInXml);

  ws.on('error', (err) => {
    console.error('write stream error', err);
  });

  ws.close(() => {
    fs.access(filePath, (fileAccessErr) => {
      if (fileAccessErr) {
        console.error('file access error', fileAccessErr);
      }

      const rs = fs.createReadStream(filePath, 'utf-8');
      let data = '';

      rs.on('data', (chunk) => {
        data += chunk;
      });

      rs.on('error', (err) => {
        console.error('read stream error', err);
      });

      rs.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename=${filePath}`,
        });

        res.write(data);
        res.end();
      });

      rs.on('close', () => {
        fs.unlink(path.resolve(filePath), (err) => {
          if (err) {
            console.error('deleting file error', err);
          }
        });
      });
    });
  });
};

module.exports = {
  normalizeResponse,
  exportUsersToXml,
};
