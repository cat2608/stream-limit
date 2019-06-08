const { expect } = require('chai');

const reqHeader = require('../../src/middleware/reqHeader');

describe('Extract authentication from request', () => {
  let req = {};
  beforeEach(() => {
    req = { headers: {}, query: {} };
  });

  it('should get user authentication from header', () => {
    req.headers = { authorization: 'Bearer eyJlbWFpbCI6ImFubmFAbWFpbC5jb20ifQ==' };
    const auth = reqHeader.extractAuth(req);
    expect(auth.email).to.equal('anna@mail.com');
  });

  it('should get user authentication url', () => {
    const token = 'L3CjthiJrg2DDTIiKTmkYbvSrr64Ss6y7yQ5Yrwl';
    req.query = { token };
    const auth = reqHeader.extractAuth(req);
    expect(auth).to.equal(token);
  });

  it('should return null when token not present', () => {
    const auth = reqHeader.extractAuth(req);
    expect(auth).to.be.null;
  });
});
