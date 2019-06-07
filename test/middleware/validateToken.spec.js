const { expect } = require('chai');

const isValidToken = require('../../src/middleware/validateToken');

describe('Validate params from token', () => {
  it('it should validate required params are present', () => {
    const token = { email: 'john@email.com' };

    const result = isValidToken(token);
    expect(result).to.be.true;
  });

  it('it should fail when param is missing', () => {
    const token = {};

    const result = isValidToken(token);
    expect(result).to.be.false;
  });
});
