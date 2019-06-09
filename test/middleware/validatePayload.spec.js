const { expect } = require('chai');

const isValidPayload = require('../../src/middleware/utils/validatePayload');

describe('Validate params from token', () => {
  it('should validate required params are present', () => {
    const token = { email: 'john@email.com' };

    const result = isValidPayload(token, ['email']);
    expect(result).to.be.true;
  });

  it('should fail when param is missing', () => {
    const token = {};

    const result = isValidPayload(token, ['email']);
    expect(result).to.be.false;
  });
});
