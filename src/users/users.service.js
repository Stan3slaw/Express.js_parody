class UsersService {
  normalizeResponse = (users, mockedUsers) => {
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
}

module.exports = new UsersService();
