const db = require('../database');

const find = (params) => {
  return db.users.find(u => u.email === params.email);
};

const create = (params) => {
  const user = { ...params };
  db.users.push(user);
  return user;
};

const update = (params) => {
  return new Promise((resolve, reject) => {
    let user = find(params);
    if (!user) {
      user = create(params);
    } else {
      user.openConnections += params.openConnections;
    }

    // simulate an error
    if (user instanceof Error) {
      reject(user);
    }
    resolve(user);
  });
};

module.exports = { update };
