const chai = require('chai');

const { expect } = chai;

const User = require('../../src/model/user.model');

describe('User model', () => {
  it('should update DB when new connection', async () => {
    const user = await User.update({ email: 'anna@mail.com' });
    expect(user.openConnections).to.equal(1);
  });
});
