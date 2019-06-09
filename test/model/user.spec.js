const chai = require('chai');

const { expect } = chai;

const User = require('../../src/model/user.model');

describe('User model', () => {
  it('should increment open connections value when user plays content', async () => {
    const user = await User.update({ email: 'anna@mail.com', openConnections: 1 });
    expect(user.openConnections).to.equal(1);
  });
});
